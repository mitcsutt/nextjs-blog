import Layout from 'components/layout/Layout';
import Head from 'next/head';
import Date from 'components/date/Date';
import utilStyles from 'styles/utils.module.scss';
import getKnex from 'getKnex';
import PostType from 'models/post';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

interface PostProps {
	postData: PostType
}

export default function Post({ postData }: PostProps) {
  return (
		<Layout>
			<Head>
        <title>{postData.title}</title>
      </Head>
			<article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date date={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contents }} />
      </article>
	</Layout>
  );
}

export async function getStaticPaths() {
  const knex = getKnex()
  const paths = await knex('posts').then(results => results.map(post => ({
    params: {
      id: post.id.toString(),
    }
  })))

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const knex = getKnex()
  const post = await knex('posts')
    .where('id', params.id)
    .first()

  const matterResult = matter(post.contents);
  const contents = await remark()
    .use(html)
    .process(matterResult.content)
    .then(result => result.toString())

  return {
    props: {
      postData: {
        ...post,
        contents,
      }
    },
  };
}

// export async function getServerSideProps({ params }) {
//   const knex = getKnex()
//   const post = await knex('posts')
//     .where('id', params.id)
//     .first()

//   const matterResult = matter(post.contents);
//   const contents = await remark()
//     .use(html)
//     .process(matterResult.content)
//     .then(result => result.toString())

//   return {
//     props: {
//       postData: {
//         ...post,
//         contents,
//       }
//     },
//   };
// }