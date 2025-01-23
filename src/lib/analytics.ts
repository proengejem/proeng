export const GA_TRACKING_ID = 'G-Y5GJKN3V0L';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

interface EventParams {
  action: string;
  category: string;
  label: string;
  value?: number;
}

export const event = ({ action, category, label, value }: EventParams) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};