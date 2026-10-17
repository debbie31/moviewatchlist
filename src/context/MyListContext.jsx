import PropTypes from 'prop-types';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

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
  const [myList, setMyList] = useState(readStoredList);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(myList));
  }, [myList]);

  const toggleInList = useCallback((item) => {
    setMyList((list) => (list.some((m) => m.id === item.id)
      ? list.filter((m) => m.id !== item.id)
      : [...list, item]));
  }, []);

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
