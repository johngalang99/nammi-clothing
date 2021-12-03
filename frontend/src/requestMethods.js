import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api/';
const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYTcyOTMxZDQwOWM4NWE4YWEyZjdmNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzODM1NzYyMywiZXhwIjoxNjM4Nzg5NjIzfQ.cT21Y7MGBrbVtzVUU5tdJwJkoufLDnkWbemnYyd6wkM';

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
