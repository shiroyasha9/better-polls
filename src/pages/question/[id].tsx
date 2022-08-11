import { useRouter } from 'next/router';

import { trpc } from '../../utils/trpc';

const QuestionsPageContent: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading } = trpc.useQuery(['questions.get-by-id', { id }]);

  if (isLoading) return <div>Loading...</div>;

  if (!data && !isLoading) {
    return <div>Question not found</div>;
  }

  return (
    <div className='flex flex-col p-8'>
      {data.isOwner && (
        <div className='bg-red-700 rounded-md p-3'>You made this!</div>
      )}
      <div className='text-2xl font-bold'>{data?.question?.question}</div>
      <div>
        {(data?.question?.options as string[]).map(option => {
          return <div key={option}>{option}</div>;
        })}
      </div>
    </div>
  );
};

const QuestionPage = () => {
  const { query } = useRouter();
  const { id } = query;

  if (!id || typeof id !== 'string') {
    return <div>No ID</div>;
  }

  return <QuestionsPageContent id={id} />;
};

export default QuestionPage;
