import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentWorkspace,
  setWorkspaceList,
} from '../store/slices/workspaceSlice';
import { workspacesService } from '../services/workspaces.service';
import type { RootState } from '../store';

export function useWorkspaces() {
  const dispatch = useDispatch();
  const { current, list } = useSelector((state: RootState) => state.workspaces);

  const fetchWorkspaces = async () => {
    const data = await workspacesService.getAll();
    dispatch(setWorkspaceList(data));
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const setCurrent = (id: number) => {
    const ws = list.find((w) => w.id === id);
    if (ws) dispatch(setCurrentWorkspace(ws));
  };

  return {
    workspaces: list,
    currentWorkspace: current,
    setCurrent,
    refetch: fetchWorkspaces,
  };
}