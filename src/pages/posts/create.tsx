import Layout from 'components/layout/Layout';
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState } from 'react';

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
);

const defaultSource = 
`## MarkdownPreview

> todo: React component preview markdown text.`;

const Post = () => {
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState(defaultSource)

  const addPost = async() => {
		const resp = await fetch(
			'/api/posts',
			{ 
        method: 'POST', 
        body: JSON.stringify({ title, contents }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
		)
		const response = await resp.json()
		console.log(response)
		// setTodos(data)
	}

  return (
    <Layout>
      <label htmlFor='title'>Title</label>
      <input id='title' value={title} onChange={e => setTitle(e.target.value)} />
      <MDEditor value={contents} onChange={setContents} />
      <button className="btn btn-blue" onClick={addPost}>
        Save
      </button>
    </Layout>
  );
}

export default Post