interface RequestWorkCardData {
  id: string;
  image: string;
  rating: number;
  price: number;
  serviceTitle: string;
  companyName: string;
  date: string;
  fileUrls: string[];
  amount: number;
  createdAt: string;
  serviceId?: string;
  service?: {
    title: string;
    Agency?: {
      name: string;
      avatarUrl?: string;
    };
  };
  status?: string;
}

export interface CleaningService {
  id: number;

  name: string;

  description: string;

  fileUrls: string;

  link: string;
}

export interface RequestWorkCardProps {
  data: RequestWorkCardData;
  isLoading?: boolean;
}
