import { useRouter } from 'next/router';

import { trpc } from '../../utils/trpc';

const QuestionsPageContent: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading } = trpc.useQuery(['questions.get-by-id', { id }]);

  if (isLoading) return <div>Loading...</div>;

  if (!data && !isLoading) {
    return <div>Question not found</div>;
  }

  return <div>{data?.question}</div>;
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
