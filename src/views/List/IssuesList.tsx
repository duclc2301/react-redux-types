import { Issue } from 'api/githubAPI';
import IssueListItem from './IssueListItem';

type IssuesListProps = {
  issues: Issue[];
};

export const IssuesList = ({ issues }: IssuesListProps) => {
  return (
    <ul>
      {issues.map((issue) => (
        <li key={issue.id}>
          <IssueListItem {...issue} />
        </li>
      ))}
    </ul>
  );
};
