# binary

> Binary library for Deno.

## Example

```ts
import { Writer } from "https://deno.land/x/binary/mod.ts";

const writer = new Writer("out.bin");
writer.writeUTF8String("Hello World!");
writer.save();
```
