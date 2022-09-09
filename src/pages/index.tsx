import Layout from 'components/layout/Layout';
import utilStyles from 'styles/utils.module.scss';
import Link from 'next/link';
import Date from 'components/date/Date';
import { GetStaticProps } from 'next';
import getKnex from 'getKnex'
import Post from 'models/post';
import Image from 'next/image'
import michael from '../../public/images/michael.jpeg'


type HomePost = Omit<Post, "contents">

interface HomeProps {
  allPostsData: HomePost[]
}

const MenuItem = ({ route, title, date}: {route: string, title: string, date?: Date}) => (
  <li className={utilStyles.listItem} key={route}>
    <Link href={route}>
      <a>{title}</a>
    </Link>
    <br />
    {date && 
      <small className={utilStyles.lightText}>
        <Date date={date} />
      </small>
    }
  </li>
)

export default ({ allPostsData }: HomeProps) => {
  return (
    <Layout home>
      {/* Keep the existing code here */}

      {/* Add this <section> tag below the existing <section> tag */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          <MenuItem route={'posts/create'} title={'Create Post'} />
          <MenuItem route={'todo'} title={'Todo'} />
          {allPostsData.map(({ id, title, date }) => <MenuItem key={id} route={`posts/${id.toString()}`} title={title} date={date} />)}
        </ul>
      </section>
      <div style={{ marginBottom: "200px "}} />
      {/* <Image 
        src={michael}
        layout="fill"
      /> */}

    </Layout>
  );
}

export const getServerSideProps:  GetStaticProps = async () => {
  const knex = getKnex()
  const allPostsData = await knex('posts')

  return {
    props: {
      allPostsData,
    },
  };
}