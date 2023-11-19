import {createContext, FC, ReactNode, useContext, Dispatch, useEffect} from 'react'
import { AppState, List, Task, appStateReducer } from './appStateReducer'
import { Action } from './actions'
import {useImmerReducer} from 'use-immer'
import { DragItem } from '../DragItem'
import {save} from '../api/index'
import { withInitialState } from '../withInitialState'

type AppStateContextProps = {
	draggedItem: DragItem | null;
	lists: List[]
	getTasksByListId(id: string): Task[]
	dispatch: Dispatch<Action>
}

const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps);
const appData:  AppState = {
	lists: [],
	draggedItem: null
}

type TAppStateProviderProps = {
	children: ReactNode
	initialState: AppState
}

export const AppStateProvider = withInitialState<TAppStateProviderProps>(({children, initialState}) => {
	const [state, dispatch] = useImmerReducer(appStateReducer, initialState)

	useEffect(() => {
		save(state);
	}, [state])

	const {lists, draggedItem} = state;
	const getTasksByListId = (id: string) => {
		return lists.find((list) => list.id === id)?.tasks || []
	}

	return (
		<AppStateContext.Provider value={{ draggedItem, lists, getTasksByListId, dispatch}}>
			{children}
		</AppStateContext.Provider>
	)
})

export const useAppState = () => {
	return useContext(AppStateContext)
}