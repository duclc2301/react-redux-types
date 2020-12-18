import { useEffect } from 'react';
import { fetchAllIssue } from 'slices/issuesSlice';
import { fetchIssuesCount } from 'slices/repoDetailsSlice';
import { useTypedDispatch, useTypedSelector } from 'store';
import { IssuesList } from './IssuesList';
import IssuesListHeader from './IssuesListHeader';

type ListProps = {
  org: string;
  repo: string;
  page: number;
  setJumpToPage: (page: number) => void;
};

export default function List(props: ListProps) {
  const { org, repo, page = 1, setJumpToPage } = props;
  const dispatch = useTypedDispatch();

  const {
    pageIssues,
    isLoading,
    error,
    issuesByNumber,
    totalPages,
  } = useTypedSelector((state) => state.issues);

  const { openIssuesCount } = useTypedSelector((state) => state.repoDetails);

  const issues = pageIssues.map((issueNumber) => issuesByNumber[issueNumber]);

  useEffect(() => {
    dispatch(fetchAllIssue(org, repo, page));
    dispatch(fetchIssuesCount(org, repo));
  }, [org, repo, page, dispatch]);

  if (error) {
    return (
      <div>
        <h1>Something went wrong...</h1>
        <div>{error}</div>
      </div>
    );
  }

  const activePage = Math.max(0, Math.min(page, totalPages));

  return (
    <div>
      <IssuesListHeader
        openIssuesCount={openIssuesCount}
        org={org}
        repo={repo}
      />
      {isLoading ? <h4>Loading...</h4> : <IssuesList issues={issues} />}
    </div>
  );
}
