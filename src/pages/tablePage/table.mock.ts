import { axiosRes } from '@/mock/res';
import { HttpResponse, http } from 'msw';
import { getRandomString } from '@/utils/index';

interface Params {
  page: number;
  perPage: number;
}

const total = 100;

function gen(params: Params) {
  const { page, perPage } = params;
  if (total <= page * perPage && total > (page - 1) * perPage) {
    return new Array(perPage - (page * perPage - total)).fill(1).map(() => {
      return {
        id: getRandomString(),
        a: getRandomString(),
        b: getRandomString(),
      };
    });
  }
  if (total < page * perPage) {
    return [];
  }
  return new Array(perPage ?? 15).fill(1).map(() => {
    return {
      id: getRandomString(),
      a: getRandomString(),
      b: getRandomString(),
    };
  });
}

export const tableMock = [
  http.get('/api/table/common', ({ request }) => {
    const url = new URL(request.url);
    const perPage = url.searchParams.get('perPage') ?? '15';
    const page = url.searchParams.get('page') ?? '1';

    return HttpResponse.json(axiosRes({
      items: gen({
        page: Number(page),
        perPage: Number(perPage),
      }),
      total,
    }));
  }),
];
