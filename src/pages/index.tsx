import Layout from 'components/layout/Layout';
import utilStyles from 'styles/utils.module.scss';
import Link from 'next/link';
import Date from 'components/date/Date';
import { GetStaticProps } from 'next';
import { getKnex } from '../../knex'
import Post from 'models/post';

type HomePost = Omit<Post, "contents">

interface HomeProps {
  allPostsData: HomePost[]
}


export default ({ allPostsData }: HomeProps) => {
  return (
    <Layout home>
      {/* Keep the existing code here */}

      {/* Add this <section> tag below the existing <section> tag */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id.toString()}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date date={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export const getStaticProps:  GetStaticProps = async () => {
  const knex = getKnex()
  const allPostsData = await knex('posts')

  return {
    props: {
      allPostsData,
    },
  };
}