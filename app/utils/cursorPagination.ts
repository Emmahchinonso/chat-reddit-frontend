import { stringifyVariables } from "@urql/core";
import {
  Cache,
  NullArray,
  Resolver,
  Variables,
} from "@urql/exchange-graphcache";

export type MergeMode = "before" | "after";

/** Input parameters for the {@link simplePagination} factory. */
export interface PaginationParams {
  /** The name of the field argument used to define the page’s offset. */
  cursorArgument?: string;
  /** The name of the field argument used to define the page’s length. */
  limitArgument?: string;
  /** Flip between forward and backwards pagination.
   *
   * @remarks
   * When set to `'after'`, its default, pages are merged forwards and in order.
   * When set to `'before'`, pages are merged in reverse, putting later pages
   * in front of earlier ones.
   */
  mergeMode?: MergeMode;
}

/** Creates a {@link Resolver} that combines pages of a primitive pagination field.
 *
 * @param options - A {@link PaginationParams} configuration object.
 * @returns the created pagination {@link Resolver}.
 *
 * @remarks
 * `simplePagination` is a factory that creates a {@link Resolver} that can combine
 * multiple lists on a paginated field into a single, combined list for infinite
 * scrolling.
 *
 * Hint: It's not recommended to use this when you can handle infinite scrolling
 * in your UI code instead.
 *
 * @see {@link https://urql.dev/goto/docs/graphcache/local-resolvers#simple-pagination} for more information.
 * @see {@link https://urql.dev/goto/docs/basics/ui-patterns/#infinite-scrolling} for an alternate approach.
 */
export const cursorPagination = ({
  cursorArgument = "cursor",
  limitArgument = "limit",
  mergeMode = "after",
}: PaginationParams = {}): Resolver<any, any, any> => {
  return (_parent: any, fieldArgs: any, cache: Cache, info: any) => {
    const { parentKey: entityKey, fieldName } = info;
    const allFields = cache.inspectFields(entityKey);
    console.log("fields ==>", entityKey, fieldName, allFields);
    const fieldInfos = allFields.filter(
      (info: any) => info.fieldName === fieldName
    );
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }
    console.log("fieldArgs ==>", fieldArgs, fieldInfos);
    const isDataInCache = cache.resolve(entityKey, fieldName, fieldArgs);
    console.log("isInCache ===>", isDataInCache);
    info.partial = !isDataInCache;

    const results: string[] = [];
    fieldInfos.forEach((fieldInfo) => {
      const data = cache.resolve(entityKey, fieldInfo.fieldKey) as string[];
      results.push(...data);
    });

    return results;

    // const visited = new Set();
    // let result: NullArray<string> = [];
    // let prevOffset: number | null = null;

    // for (let i = 0; i < size; i++) {
    //   const { fieldKey, arguments: args } = fieldInfos[i];
    //   if (args === null || !compareArgs(fieldArgs, args)) {
    //     continue;
    //   }

    //   const links = cache.resolve(entityKey, fieldKey) as string[];
    //   const currentOffset = args[cursorArgument];

    //   if (
    //     links === null ||
    //     links.length === 0 ||
    //     typeof currentOffset !== "number"
    //   ) {
    //     continue;
    //   }

    //   const tempResult: NullArray<string> = [];

    //   for (let j = 0; j < links.length; j++) {
    //     const link = links[j];
    //     if (visited.has(link)) continue;
    //     tempResult.push(link);
    //     visited.add(link);
    //   }

    //   if (
    //     (!prevOffset || currentOffset > prevOffset) ===
    //     (mergeMode === "after")
    //   ) {? = [...result, ...tempResult];
    //   } else {
    //     result = [...tempResult, ...result];
    //   }

    //   prevOffset = currentOffset;
    // }

    // const hasCurrentPage = cache.resolve(entityKey, fieldName, fieldArgs);
    // if (hasCurrentPage) {
    //   return result;
    // } else if (!(info as any).store.schema) {
    //   return undefined;
    // } else {
    //   info.partial = true;
    //   return result;
    // }
  };
};
