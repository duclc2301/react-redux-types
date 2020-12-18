type OrgProps = {
  org: string;
  repo: string;
};

type HeaderProps = {
  openIssuesCount: number;
} & OrgProps;

const RepoLink = ({ org, repo }: OrgProps) => {
  return (
    <span>
      <a
        href={`https://github.com/${org}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {org}
      </a>
      {' / '}
      <a
        href={`https://github.com/${org}/${repo}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {repo}
      </a>
    </span>
  );
};

export default function IssuesListHeader(props: HeaderProps) {
  const { openIssuesCount = -1, org, repo } = props;

  if (openIssuesCount === -1) {
    return (
      <h1>
        No issue for <RepoLink org={org} repo={repo} />
      </h1>
    );
  } else {
    const prefix = openIssuesCount === 1 ? 'issue' : 'issues';

    return (
      <h1>
        <span>{openIssuesCount}</span> open {prefix} for{' '}
        <RepoLink org={org} repo={repo} />
      </h1>
    );
  }
}
