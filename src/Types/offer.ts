interface Service {
  title: string;
}

interface Client {
  name: string;
}

interface OfferData {
  id: string;
  status: string;
  fileUrls: [string];
  amount: number;
  createdAt: string;
  service?: Service;
  client?: Client;
}

export interface NewRequestWorkCardProps {
  data: OfferData;
  // onRemove: (id: string) => void;
}

interface Service {
  title: string;
}

interface Client {
  name: string;
}

interface OfferData {
  id: string;
  status: string;
  fileUrls: [string];
  amount: number;
  createdAt: string;
  service?: Service;
  client?: Client;
}

export interface RequestWorkCardPropsOffer {
  data: OfferData;
  client?: {
    avatarUrl?: string;
  };
}

interface Service {
  title: string;
}

interface Client {
  name: string;
  avatarUrl?: string;
}

export interface Offer {
  id: string;
  status: string;
  fileUrls: [string];
  amount: number;
  createdAt: string;
  service?: Service;
  client?: Client;
  disabled?: boolean;
}
