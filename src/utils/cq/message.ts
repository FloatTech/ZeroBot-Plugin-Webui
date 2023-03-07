import { MessageElem } from 'oicq/lib/message/elements';
import qs from 'qs';
export function genCqcode(content: MessageElem[]) {
  let cqcode = '';
  for (const elem of content) {
    if (elem.type === 'text') {
      cqcode += elem.text;
      continue;
    }
    const tmp = { ...elem } as Partial<MessageElem>;
    delete tmp.type;
    const str = qs.stringify(tmp as NodeJS.Dict<any>, {
      delimiter: ',',
      indices: false,
      encoder: (s) => {
        const t = s.toString();
        t.replace(/&|,|\[|\]/g, escapeCQInside);
        return t;
      },
    });
    cqcode += '[CQ:' + elem.type + (str ? ',' : '') + str + ']';
  }
  return cqcode;
}

function escapeCQInside(s: string) {
  if (s === '&') return '&amp;';
  if (s === ',') return '&#44;';
  if (s === '[') return '&#91;';
  if (s === ']') return '&#93;';
  return '';
}
