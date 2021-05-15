export const GET_POST_TYPE_1_SCHEMA = `
query getTypeSchema {
    __type(name: "post_type_1") {
      name
      fields {
        name
        type{
          ofType{
            name
          }
        }
      }
    }
  }
`;

export const QUERY = `
query myQ($where:post_type_1_bool_exp){
    post_type_1(where:$where) {
      id
      title
      content
      created_at
      custom_field_date
      custom_field_datetime
      custom_field_int
      custom_field_text
    }
  }
`;

export const queryBuilder = (entity, fields = []) => `
query myQ($where:${entity}_bool_exp){
${entity}(where:$where) {
${fields.join("\n")}
}
}
`;
