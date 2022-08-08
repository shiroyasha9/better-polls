import type { NextPage } from 'next';
import { prisma } from '../db/client';

const Home: NextPage = (props: any) => {
  return (
    <div>
      Hello world
      <code>{props.questions}</code>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const questions = await prisma.pollQuestion.findMany();

  return {
    props: {
      questions: JSON.stringify(questions)
    }
  };
};
