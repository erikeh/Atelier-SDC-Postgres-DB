import http from 'k6/http';
import { sleep } from 'k6';

export default function() {
  http.get('127.0.0.1/products');
  sleep(1);
}