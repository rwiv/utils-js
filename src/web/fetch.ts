import {Readable} from "stream";

export function responseToReadable(response: Response) {
  const reader = response.body?.getReader();
  if (reader === undefined || reader == null) return;
  const rs = new Readable();
  rs._read = async () => {
    const result = await reader.read();
    if(!result.done){
      rs.push(Buffer.from(result.value));
    }else{
      rs.push(null);
      return;
    }
  };
  return rs;
}
