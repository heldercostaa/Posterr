export interface IFindByDTO {
  username?: string;
  includeFollowers?: boolean;
  includeFollowing?: boolean;
  includePosts?: boolean;
  includeReposts?: boolean;
  includeQuotePosts?: boolean;
}
