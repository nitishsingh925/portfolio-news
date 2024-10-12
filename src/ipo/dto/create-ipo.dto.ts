export class CreateIpoDto {
  symbol: string;
  name: string;
  status: string;
  is_sme: boolean;
  additional_text: string;
  min_price: number;
  max_price: number;
  bidding_start_date: string;
  listing_date: string;
  document_url: string;
}
