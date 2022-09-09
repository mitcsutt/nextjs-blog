import { useCallback, useEffect, useState, MouseEvent } from 'react'
import Head from 'next/head'
import Todo from 'models/todo'
import Layout from 'components/layout/Layout'
import { useForm } from 'react-hook-form'
import useSwr from 'swr'

interface FormFields {
	todo: string
}

const fetchTodos = async(path: string) => {
	const resp = await fetch(path, {
		headers: {
			'Content-Type': 'application/json'
		}
	})
	return await resp.json()
}

export default function Home() {
	const { register, handleSubmit } = useForm<FormFields>({ defaultValues: { todo: '' }})

	const { data: todos, isValidating, mutate } = useSwr<Todo[]>('/api/todos', fetchTodos)

	const addTodo = useCallback(async({ todo }: FormFields) => {
		await fetch(
			'/api/todos',
			{ 
				method: 'POST', 
				body: JSON.stringify({ text: todo }),
				headers: {
          'Content-Type': 'application/json'
        }
			}
		)
		mutate()
	}, [])

	// const toggleTodo = useCallback(async(id: number, complete: boolean) => {
	// 	const resp = await fetch('/api/todos')
	// 	const data = await resp.json()
	// 	setTodos(data)
	// }, [])

  return (
		<Layout>
			<div className="container">
				<Head>
					<title>Create Next App</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<main>
					<h1 className="title">
						Welcome to a super cool Todo list
					</h1>

					{isValidating && <p className="todos-loading">Todos loading...</p>}
					{todos &&
						todos.map((todo) => {
							return (
								<p className="todos-item">
									{todo.text} {todo.complete && '(complete)'}
								</p>
							)
						})
					}

					<div className="todo-input">
						<input {...register('todo')}/>
						<button onClick={handleSubmit(addTodo)}>Add</button>
					</div>
				</main>

				<style jsx>{`
					main {
						display: flex;
						flex-direction: column;
						justify-content: center;
					}

					.container {
						padding: 0 0.5rem;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
					}

					.title {
						margin: 0;
						line-height: 1.15;
						font-size: 4rem;
						text-align: center;
					}

					.todos-loading {
						color: rgba(0, 0, 0, 0.4);
						margin: 0;
					}

					.todos-item {
						margin: 0 0 4px;
					}

					.todo-input {
						display: flex;
						flex-direction: row;
					}

					input {
						width: 100%;
					}
				`}</style>
			</div>
		</Layout>
  )
}