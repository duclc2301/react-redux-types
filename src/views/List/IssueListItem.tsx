import { Issue } from 'api/githubAPI';

export default function IssueListItem(props: Issue) {
  return <div>{props.title}</div>;
}
