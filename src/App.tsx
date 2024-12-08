import styles from './app.module.css';
import { useController, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

type FormData = {
	email: string;
	password: string;
	password_repeat: string;
};

const App: React.FC = () => {
	const [isFormValid, setIsFormValid] = useState<boolean>(true);
	const { handleSubmit, control } = useForm<FormData>({ mode: 'onChange' });

	const { field: emailField, fieldState: emailFieldState } = useController({
		name: 'email',
		control,
		defaultValue: '',
		rules: {
			required: 'Поле обязательно',
			pattern: { value: /^\S+@\S+\.\S+$/, message: 'Введите корректный email' },
		},
	});

	const { field: passwordField, fieldState: passwordFieldState } = useController({
		name: 'password',
		control,
		defaultValue: '',
		rules: {
			required: 'Поле обязательно',
			minLength: { value: 8, message: 'Минимальное количество 8 символов' },
		},
	});

	const { field: passwordRepeatField, fieldState: passwordRepeatFieldState } =
		useController({
			name: 'password_repeat',
			control,
			defaultValue: '',
			rules: {
				required: 'Поле обязательно',
				validate: (value) =>
					value === passwordField.value || 'Пароли не совпадают.',
			},
		});

	const onSubmit = (data: FormData) => {
		console.log(data);
	};

	useEffect(() => {
		const isEmailFieldValid = !emailFieldState.isDirty
			? true
			: !!emailFieldState.error;

		const isPasswordFieldValid = !passwordFieldState.isDirty
			? true
			: !!passwordFieldState.error;

		const isPasswordRepeatFieldValid = !passwordRepeatFieldState.isDirty
			? true
			: !!passwordRepeatFieldState.error;

		!isEmailFieldValid && !isPasswordFieldValid && !isPasswordRepeatFieldValid
			? setIsFormValid(false)
			: setIsFormValid(true);
	}, [emailFieldState, passwordFieldState, passwordRepeatFieldState]);

	return (
		<>
			<div>
				<h1 style={{ textAlign: 'center' }}>Регистрация пользователя</h1>
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<label className={styles.label}>
					Email:{' '}
					<input
						{...emailField}
						placeholder={'Введите свой email'}
						className={styles.input}
					/>
					{emailFieldState.error && (
						<span style={{ color: 'red' }}>
							{emailFieldState.error.message}
						</span>
					)}
				</label>
				<label className={styles.label}>
					Пароль:{' '}
					<input
						type={'password'}
						{...passwordField}
						placeholder={'Введите свой пароль'}
						className={styles.input}
					/>
					{passwordFieldState.error && (
						<span style={{ color: 'red' }}>
							{passwordFieldState.error.message}
						</span>
					)}
				</label>

				<label className={styles.label}>
					Повторите пароль:{' '}
					<input
						type={'password'}
						{...passwordRepeatField}
						placeholder={'Повторите пароль'}
						className={styles.input}
					/>
					{passwordRepeatFieldState.error && (
						<span style={{ color: 'red' }}>
							{passwordRepeatFieldState.error.message}
						</span>
					)}
				</label>

				<button type={'submit'} disabled={isFormValid}>
					Зарегестрироваться
				</button>
			</form>
		</>
	);
};

export default App;
