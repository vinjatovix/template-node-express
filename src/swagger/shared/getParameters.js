const patternId = "^[0-9a-fA-F]{24}$";

const delayInQuery = {
  in: "query",
  name: "delay",
  description: "Delay the response in seconds",
  schema: {
    type: "integer",
    minimum: 0
  }
};

const idInPath = {
  in: "path",
  name: "id",
  description: "Model id",
  schema: {
    type: "string",
    pattern: patternId
  }
};

const slugInPath = {
  in: "path",
  name: "slug",
  description: "Model slug",
  schema: {
    type: "string"
  },
  required: true
};

const nameInPath = {
  in: "path",
  name: "name",
  description: "Model name",
  schema: {
    type: "string"
  },
  required: true
};

const includeInQuery = {
  in: "query",
  name: "include",
  description: "Include related models",
  schema: {
    type: "string"
  }
};

const filterQuery = {
  name: "filter",
  description: "Filter the queries according to parameters. Use dot notation.",
  examples: {
    equal: {
      value: { "array.field": "value" },
      summary: "Field equal to value"
    },
    unequal: {
      value: { "object.field": "<>value" },
      summary: "Field unequal to value (<>)"
    },
    contains: {
      value: { field: "~value" },
      summary: "Field contains to value (~)"
    },
    notContains: {
      value: { field: "!~value" },
      summary: "Field not contains to value (!~)"
    },
    in: {
      value: { field: "valueA,valueB" },
      summary: "Field equals any value: valueA or valueB (,)"
    },
    exists: {
      value: { field: "" },
      summary: "Field exists"
    },
    notExists: {
      value: { field: "!" },
      summary: "Field not exists (!)"
    },
    gt: {
      value: { field: ">value" },
      summary: "Field greater than value (>)"
    },
    lt: {
      value: { field: "<value" },
      summary: "Field less than value (<)"
    },
    gte: {
      value: { field: ">=value" },
      summary: "Field greater than or equal to value (>=)"
    },
    lte: {
      value: { field: "<=value" },
      summary: "Field less than or equal to value (<=)"
    },
    or: {
      value: { "field1|field2": "~value" },
      summary: "Field1 or field2 contains to value (|)"
    }
  },
  in: "query",
  schema: {
    type: "object"
  },
  style: "deepObject",
  explode: true
};

const selectFieldsQuery = {
  name: "fields",
  description: "Return only specific fields",
  in: "query",
  schema: {
    type: "string"
  },
  required: false,
  example: "_id,name,metadata.createdAt"
};

const pageQuery = {
  name: "page",
  description: "Page limit and page offset.",
  in: "query",
  required: false,
  example: {
    offset: 40,
    limit: 20
  },
  schema: {
    type: "object"
  },
  style: "deepObject",
  explode: true
};

const sortQuery = {
  name: "sort",
  description: "Sort queries",
  in: "query",
  required: false,
  schema: {
    type: "string"
  }
};

const getParameters = allParameters => {
  const { include, filter, sort, id, name, slug, select, pagination, delay } = allParameters;

  return [
    delay && delayInQuery,
    id && idInPath,
    slug && slugInPath,
    name && nameInPath,
    include && includeInQuery,
    select && selectFieldsQuery,
    filter && { ...filterQuery, ...filter },
    pagination && pageQuery,
    sort && sortQuery
  ].filter(Boolean);
};

module.exports = { getParameters };
