import styles from './app.module.css';
import { useEffect, useRef, useState } from 'react';

type FormData = {
	email: string;
	password: string;
	password_repeat: string;
};

const App: React.FC = () => {
	const [form, setForm] = useState<FormData>({
		email: '',
		password: '',
		password_repeat: '',
	});
	const [isFormValid, setIsFormValid] = useState<boolean>(false);
	const [errors, setErrors] = useState<FormData>({
		email: '',
		password: '',
		password_repeat: '',
	});
	const buttonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		const emailValid = /^\S+@\S+\.\S+$/.test(form.email);

		const passwordValid = form.password.length > 7;

		const passwordRepeatValid =
			passwordValid && form.password === form.password_repeat;
		emailValid && passwordValid && passwordRepeatValid ? setIsFormValid(true) : null;

		const _errors: FormData = {
			email: !emailValid ? 'Введите корректный email' : '',
			password: !passwordValid ? 'Пароль должен быть от 8 символов' : '',
			password_repeat: !passwordRepeatValid ? 'Пароли должны совпадать' : '',
		};
		setErrors(_errors);

		const _isFormValid = emailValid && passwordValid && passwordRepeatValid;
		if (_isFormValid) {
			setIsFormValid(true);
			setTimeout(() => {
				buttonRef?.current?.focus();
			}, 0);
		}
	}, [form.email, form.password, form.password_repeat]);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(form);
	};
	return (
		<>
			<div>
				<h1 style={{ textAlign: 'center' }}>Регистрация пользователя</h1>
			</div>
			<form onSubmit={onSubmit} className={styles.form}>
				<label className={styles.label}>
					Email:{' '}
					<input
						type={'email'}
						placeholder={'Введите свой email'}
						value={form.email}
						onChange={({ target }) =>
							setForm({ ...form, email: target.value })
						}
						className={styles.input}
					/>
					<span style={{ color: 'red' }}>{errors.email}</span>
				</label>

				<label className={styles.label}>
					Пароль:{' '}
					<input
						type={'password'}
						placeholder={'Введите пароль'}
						value={form.password}
						onChange={({ target }) =>
							setForm({ ...form, password: target.value })
						}
						className={styles.input}
					/>
					<span style={{ color: 'red' }}>{errors.password}</span>
				</label>

				<label className={styles.label}>
					Повторите пароль:
					<input
						type={'password'}
						placeholder={'Повторите пароль'}
						value={form.password_repeat}
						onChange={({ target }) =>
							setForm({ ...form, password_repeat: target.value })
						}
						className={styles.input}
					/>
					<span style={{ color: 'red' }}>{errors.password_repeat}</span>
				</label>
				<button type={'submit'} ref={buttonRef} disabled={!isFormValid}>
					Зарегестрироваться
				</button>
			</form>
		</>
	);
};

export default App;
