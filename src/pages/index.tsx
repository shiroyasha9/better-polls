import type { NextPage } from 'next';
import React from 'react';
import { trpc } from '../utils/trpc';

const QuestionCreator: React.FC = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const client = trpc.useContext();
  const { mutate, isLoading } = trpc.useMutation('questions.create', {
    onSuccess: () => {
      client.invalidateQueries(['questions.get-all']);
      if (!inputRef.current) return;
      inputRef.current.value = '';
    }
  });
  return (
    <input
      disabled={isLoading}
      onKeyDown={event => {
        if (event.key === 'Enter') {
          console.log(event.currentTarget.value);
          mutate({ question: event.currentTarget.value });
        }
      }}
      ref={inputRef}
    ></input>
  );
};

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(['questions.get-all']);

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  console.log(data);

  return (
    <div className='p-6 flex flex-col'>
      <div className='flex flex-col'>
        <div className='text-2xl font-bold'>Questions</div>
        {data.map(question => {
          return (
            <div key={question.id} className='my-2'>
              {question.question}
            </div>
          );
        })}
      </div>
      <QuestionCreator />
    </div>
  );
};

export default Home;
