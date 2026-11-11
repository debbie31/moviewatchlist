import PropTypes from 'prop-types';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { api } from '../api';
import { useAuth } from './AuthContext';

const STORAGE_KEY = 'myMovieList';

const readStoredList = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const MyListContext = createContext(null);

export function MyListProvider({ children }) {
  const { token } = useAuth();
  const [myList, setMyList] = useState(readStoredList);

  // Persist guest list locally; logged-in users sync with the API
  useEffect(() => {
    let cancelled = false;

    const loadFromServer = async () => {
      try {
        const { data } = await api.get('/list');
        // Merge any movies saved while logged out into the server list
        const local = readStoredList();
        const missing = local.filter(
          (m) => !data.some((s) => s.id === m.id)
        );
        if (missing.length) {
          const { data: merged } = await api.post('/list/merge', { movies: missing });
          if (!cancelled) setMyList(merged);
        } else if (!cancelled) {
          setMyList(data);
        }
      } catch {
        if (!cancelled) setMyList(readStoredList());
      }
    };

    if (token) {
      loadFromServer();
    } else {
      setMyList(readStoredList());
    }

    return () => {
      cancelled = true;
    };
  }, [token]);

  useEffect(() => {
    if (!token) localStorage.setItem(STORAGE_KEY, JSON.stringify(myList));
  }, [myList, token]);

  const toggleInList = useCallback(
    (item) => {
      const exists = myList.some((m) => m.id === item.id);

      // optimistic update
      setMyList((list) => {
        if (exists) return list.filter((m) => m.id !== item.id);
        return [...list, item];
      });

      if (token) {
        const request = exists
          ? api.delete(`/list/${item.id}`)
          : api.post('/list', item);
        request.then(({ data }) => setMyList(data)).catch(() => {});
      }
    },
    [myList, token]
  );

  const isInList = useCallback(
    (id) => myList.some((m) => m.id === id),
    [myList]
  );

  const value = useMemo(
    () => ({ myList, toggleInList, isInList }),
    [myList, toggleInList, isInList]
  );

  return <MyListContext.Provider value={value}>{children}</MyListContext.Provider>;
}

MyListProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useMyList = () => useContext(MyListContext);
