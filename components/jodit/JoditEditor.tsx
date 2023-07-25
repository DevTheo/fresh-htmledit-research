
//import { func, number, object, string } from 'prop-types';
import { Jodit } from './include.jodit.ts';
import { useRef } from "preact/hooks";
import { useEffect } from "preact/hooks";
import { useLayoutEffect } from "preact/hooks";
import { forwardRef } from "preact/compat";

//const J = Jodit.Jodit;

const { isFunction } = Jodit.modules.Helpers;

function usePrevious(value: any) {
	const ref = useRef<any | null | undefined>();
	useEffect(() => {
		ref.current = value;
	}, [value]);
	return ref.current;
}


// type DeepPartial<T> = T extends object
// 	? {
// 			[P in keyof T]?: DeepPartial<T[P]>;
// 	  }
// 	: T;

export type JoditEditorProps = {
		className?: string;
		//config?: DeepPartial<Jodit['options']>;
		config: object,
		id?: string;
		name?: string;
		onBlur?: (textAreaValue: string, e: any) => void;
		onChange?: (newValue: string) => void;
		editorRef?: any; //func,
		tabIndex?: number;
		value?: string;
/*
	value: string;
	className?: string;
	// eslint-disable-next-line no-unused-vars
	onChange?: (newValue: string) => void;
	// eslint-disable-next-line no-unused-vars
	onBlur?: (newValue: string) => void;
*/
}



const JoditEditor = forwardRef<(any | null), JoditEditorProps>(
	(
		{
			className,
			config,
			id,
			name,
			onBlur,
			onChange,
			tabIndex,
			value,
			editorRef
		}: JoditEditorProps,
		ref
	) => {
		const textArea = useRef<any | null>(null);

		useLayoutEffect(() => {
			if (ref) {
				if (isFunction(ref)) {
					(ref as any)(textArea.current);
				} else {
					(ref as any).current = textArea.current;
				}
			}
		}, [textArea, ref]);

		useEffect(() => {
			const element = textArea.current;
			const jodit = Jodit.make(element, config);
			(ref as any).current = jodit;

			if (isFunction(editorRef)) {
				editorRef(jodit);
			}

			return () => {
				if (jodit) {
					jodit.destruct();
				}

				textArea.current = element;
			};
		}, [config, editorRef]);

		const preClassName = usePrevious(className);

		useEffect(() => {
			const classList = textArea.current?.container?.classList;

			if (
				preClassName !== className &&
				typeof preClassName === 'string'
			) {
				(preClassName as string).split(/\s+/).forEach(cl => classList?.remove(cl));
			}

			if (className && typeof className === 'string') {
				className.split(/\s+/).forEach(cl => classList?.add(cl));
			}
		}, [className, preClassName]);

		useEffect(() => {
			if (textArea.current.workplace) {
				textArea.current.workplace.tabIndex = tabIndex || -1;
			}
		}, [tabIndex]);

		useEffect(() => {
			if (!textArea.current.events || (!onBlur && !onChange)) {
				return;
			}

			const onBlurHandler = (e:any) =>
				onBlur && onBlur(textArea.current.value, e);
			const onChangeHandler = (value: string) => onChange && onChange(value);

			// adding event handlers
	
			textArea.current.events
				.on('blur', onBlurHandler)
				.on('change', onChangeHandler);

			return () => {
				// Remove event handlers
				textArea.current?.events
					?.off('blur', onBlurHandler)
					.off('change', onChangeHandler);
			};
		}, [onBlur, onChange]);

		useEffect(() => {
			const updateValue = () => {
				if (textArea.current && textArea?.current?.value !== value) {
					textArea.current.value = value;
				}
			};

			if (textArea.current) {
				textArea.current.isReady
					? updateValue()
					: textArea.current.waitForReady().then(updateValue);
			}
		}, [value]);

		return (
			<div className={'jodit-react-container'}>
				<textarea
					defaultValue={value}
					name={name}
					id={id}
					ref={textArea}
				/>
			</div>
		);
	}
);

JoditEditor.displayName = 'JoditEditor';

// JoditEditor.propTypes = {
// 	className: string,
// 	config: object,
// 	id: string,
// 	name: string,
// 	onBlur: func,
// 	onChange: func,
// 	editorRef: func,
// 	tabIndex: number,
// 	value: string
// };

export default JoditEditor;