export interface WelcomeContent {
  subtitle: string
}

export interface KnowledgePill {
  title: string;
  description: string;
}

export interface KnowledgePills {
  subtitle: string;
  knowledgePills: KnowledgePill[];
}

export interface InformativeVideo {
  title: string;
  url: string;
}

export interface InformativeVideos {
  subtitle: string;
  informativeVideos: InformativeVideo[];
}

export interface HomeContent {
  id: string;
  welcomeContent: WelcomeContent;
  knowledgePillsContent: KnowledgePills;
  informativeVideosContent: InformativeVideos;
  createdAt: Date;
  updatedAt: Date;
}