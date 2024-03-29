import {useState, useEffect, ComponentType} from 'react'
import { AppState } from './state/appStateReducer'
import { load } from './api';

type InjectedProps = {
	initialState: AppState
}

type PropsWithOutInjected<TBaseProps> = Omit<TBaseProps, keyof InjectedProps>;

export function withInitialState<TProps>(WrappedComponent: ComponentType<PropsWithOutInjected<TProps> & InjectedProps>) {
	return (props: PropsWithOutInjected<TProps>) => {
		const [initialState, setInitialState] = useState<AppState>({
			lists:[],
			draggedItem: null
		});
		const [isLoading, setIsLoading] = useState(true)
		const [error, setError] = useState<Error | undefined>()

		useEffect(() => {
			const fetchInitialState = async() => {
				try {
					const data: any = await load();
					setInitialState(data)
				} catch (e: any) {
					setError(e)
				}
				setIsLoading(false)
			}
			fetchInitialState();
		}, [])
		
		if (isLoading) {
			return <div>Loading...</div>
		}

		if (error) {
			return <div>{error.message}</div>
		}

		return (
			<WrappedComponent {...props} initialState={initialState} />
		)
	}
}