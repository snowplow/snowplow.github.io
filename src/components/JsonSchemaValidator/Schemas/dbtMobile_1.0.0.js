export const Schema = {
  "definitions": {
    passthrough_vars: {
      type: 'array',
      description: '> Click the plus sign to add a new entry',
      minItems: 0,
      items: {
        title: "Type",
        oneOf: [
          {
            type: 'string',
            title: "Column Name"
          },
          {
            type: 'object',
            title: "SQL & Alias",
            properties: {
              sql: { type: 'string' },
              alias: { type: 'string' } // TODO: add regex here to make valid SQL name?
            },
            required: ['sql', 'alias'],
            additionalProperties: false
          }
        ]
      },
      uniqueItems: true,
    }
  },
  type: 'object',
  properties: {
    snowplow__atomic_schema: {
      type: 'string',
      title: 'Schema',
      description: 'Schema (dataset) that contains your atomic events',
      longDescription: 'The schema (dataset for BigQuery) that contains your atomic events table.',
      packageDefault: 'atomic',
      group: 'Warehouse and Tracker',
    },
    snowplow__database: {
      type: 'string',
      title: 'Database',
      description: 'Database that contains your atomic events',
      longDescription: 'The database that contains your atomic events table.',
      packageDefault: 'target.database',
      group: 'Warehouse and Tracker',
    },
    snowplow__dev_target_name: {
      type: 'string',
      title: 'Dev Target',
      description:
        'Target name of your development environment as defined in your `profiles.yml` file',
      longDescription: 'The [target name](https://docs.getdbt.com/docs/core/connect-data-platform/profiles.yml) of your development environment as defined in your `profiles.yml` file. See the [Manifest Tables](/docs/modeling-your-data/modeling-your-data-with-dbt/dbt-operation/#manifest-tables) section for more details.',
      packageDefault: 'dev',
      group: 'Warehouse and Tracker',
    },
    snowplow__events_table: {
      type: 'string',
      title: 'Events Table',
      description: 'The name of the table that contains your atomic events',
      longDescription: 'The name of the table that contains your atomic events.',
      packageDefault: 'events',
      group: 'Warehouse and Tracker',
    },
    snowplow__sessions_table: {
      type: 'string',
      title: 'Sessions Table',
      description:
        'The users module requires data from the derived sessions table. If you choose to disable the standard sessions table in favor of your own custom table, set this to reference your new table e.g. {{ ref("snowplow_mobile_sessions_custom") }}',
      group: 'Warehouse and Tracker',
      longDescription: 'The users module requires data from the derived sessions table. If you choose to disable the standard sessions table in favor of your own custom table, set this to reference your new table e.g. `{{ ref(\'snowplow_mobile_sessions_custom\') }}`. Please see the [README](https://github.com/snowplow/dbt-snowplow-mobile/tree/main/custom_example) in the `custom_example` directory for more information on this sort of implementation.',
      packageDefault: '"{{ ref( \'snowplow_mobile_sessions\' ) }}"',
    },
    snowplow__allow_refresh: {
      type: 'boolean',
      title: 'Allow Refresh',
      group: 'Operation and Logic',
      longDescription: 'Used as the default value to return from the `allow_refresh()` macro. This macro determines whether the manifest tables can be refreshed or not, depending on your environment. See the [Manifest Tables](/docs/modeling-your-data/modeling-your-data-with-dbt/dbt-operation/#manifest-tables) section for more details.',
      packageDefault: 'false',
    },
    snowplow__backfill_limit_days: {
      type: 'number',
      minimum: 0,
      title: 'Backfill Limit',
      group: 'Operation and Logic',
      longDescription: 'The maximum numbers of days of new data to be processed since the latest event processed. Please refer to the [incremental logic](/docs/modeling-your-data/modeling-your-data-with-dbt/dbt-advanced-usage/dbt-incremental-logic/#package-state) section for more details.',
      packageDefault: '30',
      description:
        'The maximum numbers of days of new data to be processed since the latest event processed',
    },
    snowplow__days_late_allowed: {
      type: 'number',
      minimum: 0,
      title: 'Days Late Allowed',
      group: 'Operation and Logic',
      longDescription: 'The maximum allowed number of days between the event creation and it being sent to the collector. Exists to reduce lengthy table scans that can occur as a result of late arriving data.',
      packageDefault: '3',
      description:
        'The maximum allowed number of days between the event creation and it being sent to the collector',
    },
    snowplow__lookback_window_hours: {
      type: 'number',
      minimum: 0,
      title: 'Event Lookback Window',
      longDescription: 'The number of hours to look before the latest event processed - to account for late arriving data, which comes out of order.',
      packageDefault: '6',
      group: 'Operation and Logic',
      description:
        'The number of hours to look before the latest event processed - to account for late arriving data, which comes out of order',
    },
    snowplow__max_session_days: {
      type: 'number',
      minimum: 0,
      title: 'Max Session Length',
      longDescription: 'The maximum allowed session length in days. For a session exceeding this length, all events after this limit will stop being processed. Exists to reduce lengthy table scans that can occur due to long sessions which are usually a result of bots.',
      packageDefault: '3',
      group: 'Operation and Logic',
      description:
        'The maximum allowed session length in days. For a session exceeding this length, all events after this limit will stop being processed',
    },
    snowplow__session_lookback_days: {
      type: 'number',
      minimum: 0,
      title: 'Session Lookback Window',
      longDescription: 'Number of days to limit scan on `snowplow_mobile_base_sessions_lifecycle_manifest` manifest. Exists to improve performance of model when we have a lot of sessions. Should be set to as large a number as practical.',
      packageDefault: '730',
      group: 'Operation and Logic',
      description:
        'Number of days to limit scan on `snowplow_mobile_base_sessions_lifecycle_manifest` manifest',
    },
    snowplow__session_stitching: {
      type: 'boolean',
      title: 'Enable Session Stitching',
      longDescription: 'Determines whether to apply the user mapping to the sessions table. Please see the [User Mapping](/docs/modeling-your-data/modeling-your-data-with-dbt/dbt-advanced-usage/dbt-user-mapping/) section for more details.',
      packageDefault: 'true',
      group: 'Operation and Logic',
    },
    snowplow__start_date: {
      type: 'string',
      format: 'date',
      title: 'Start Date',
      group: 'Operation and Logic',
      longDescription: 'The date to start processing events from in the package on first run or a full refresh, based on `collector_tstamp`',
      packageDefault: '2020-01-01',
      description:
        'The date to start processing events from in the package on first run or a full refresh, based on `collector_tstamp`',
    },
    snowplow__upsert_lookback_days: {
      type: 'number',
      minimum: 0,
      title: 'Upsert Lookback Days',
      group: 'Operation and Logic',
      longDescription: 'Number of days to look back over the incremental derived tables during the upsert. Where performance is not a concern, should be set to as long a value as possible. Having too short a period can result in duplicates. Please see the [Snowplow Optimized Materialization](/docs/modeling-your-data/modeling-your-data-with-dbt/dbt-advanced-usage/dbt-incremental-materialization/) section for more details.',
      packageDefault: '30',
      description:
        'Number of days to look back over the incremental derived tables during the upsert',
    },
    snowplow__app_id: {
      type: 'array',
      description: '> Click the plus sign to add a new entry',
      minItems: 0,
      title: 'App IDs',
      longDescription: 'A list of `app_id`s to filter the events table on for processing within the package.',
      packageDefault: '[ ] (no filter applied)',
      group: 'Contexts, Filters, and Logs',
      items: { type: 'string' },
    },
    snowplow__enable_app_errors_module: {
      type: 'boolean',
      group: 'Contexts, Filters, and Logs',
      longDescription: 'Flag to enable the app errors module (details relating to app errors that occur during sessions).',
      packageDefault: 'false',
      title: 'Enable App Errors Module',
    },
    snowplow__enable_application_context: {
      type: 'boolean',
      group: 'Contexts, Filters, and Logs',
      longDescription: 'Flag to include the Application context (app version and build) columns in the models.',
      packageDefault: 'false',
      title: 'Enable Application Context',
    },
    snowplow__enable_geolocation_context: {
      type: 'boolean',
      group: 'Contexts, Filters, and Logs',
      longDescription: 'Flag to include the Geolocation context (device latitude, longitude, bearing, etc.) columns in the models.',
      packageDefault: 'false',
      title: 'Enable Geolocation Context',
    },
    snowplow__enable_mobile_context: {
      type: 'boolean',
      group: 'Contexts, Filters, and Logs',
      longDescription: 'Flag to include the Mobile context (device type, OS, etc.) columns in the models.',
      packageDefault: 'false',
      title: 'Enable Mobile Context',
    },
    snowplow__enable_screen_context: {
      type: 'boolean',
      group: 'Contexts, Filters, and Logs',
      longDescription: 'Flag to include the Screen context (screen details associated with mobile event) columns in the models.',
      packageDefault: 'false',
      title: 'Enable Screen Context',
    },
    snowplow__has_log_enabled: {
      type: 'boolean',
      group: 'Contexts, Filters, and Logs',
      longDescription: 'When executed, the package logs information about the current run to the CLI. This can be disabled by setting to `false`.',
      packageDefault: 'true',
      title: 'Enable Run Logs',
    },
    snowplow__platform: {
      group: 'Contexts, Filters, and Logs',
      longDescription: 'A list of `platform`s to filter the events table on for processing within the package.',
      title: 'Filter Platform',
      type: 'array',
      description: '> Click the plus sign to add a new entry',
      minItems: 0,
      packageDefault: "['mob']",
      items: { type: 'string' },
    },
    snowplow__databricks_catalog: {
      type: 'string',
      title: '(Databricks) Catalog',
      warehouse: 'Databricks',
      group: 'Warehouse Specific',
      longDescription: "The catalogue your atomic events table is in. Depending on the use case it should either be the catalog (for Unity Catalog users from databricks connector 1.1.1 onwards, defaulted to `hive_metastore`) or the same value as your `snowplow__atomic_schema` (unless changed it should be 'atomic').",
      packageDefault: 'hive_metastore',
      description: 'The catalogue your atomic events table is in',
    },
    snowplow__session_context: {
      type: 'string',
      warehouse: 'Redshift',
      title: '(Redshift) Session Context Table',
      longDescription: 'The table name for your session context.',
      packageDefault: 'com_snowplowanalytics_snowplow_client_session_1',
      group: 'Warehouse Specific',
    },
    snowplow__mobile_context: {
      type: 'string',
      warehouse: 'Redshift',
      title: '(Redshift) Mobile Context Table',
      longDescription: 'The table name for your Mobile entity.',
      packageDefault: 'com_snowplowanalytics_snowplow_mobile_context_1',
      group: 'Warehouse Specific',
    },
    snowplow__geolocation_context: {
      type: 'string',
      warehouse: 'Redshift',
      title: '(Redshift) Geolocation Context Table',
      longDescription: 'The table name for your Geolocation entity.',
      packageDefault: 'com_snowplowanalytics_snowplow_geolocation_context_1',
      group: 'Warehouse Specific',
    },
    snowplow__application_context: {
      type: 'string',
      warehouse: 'Redshift',
      title: '(Redshift) Application Context Table',
      longDescription: 'The table name for your application entity.',
      packageDefault: 'com_snowplowanalytics_mobile_application_1',
      group: 'Warehouse Specific',
    },
    snowplow__screen_context: {
      type: 'string',
      warehouse: 'Redshift',
      title: '(Redshift) Mobile Screen Context Table',
      longDescription: 'The table name for your Mobile Screen context.',
      packageDefault: 'com_snowplowanalytics_mobile_screen_1',
      group: 'Warehouse Specific',
    },
    snowplow__app_errors_table: {
      type: 'string',
      warehouse: 'Redshift',
      title: '(Redshift) Application Error Events Table',
      longDescription: 'The table name for your application error events.',
      packageDefault: 'com_snowplowanalytics_snowplow_application_error_1',
      group: 'Warehouse Specific',
    },
    snowplow__screen_view_events: {
      type: 'string',
      warehouse: 'Redshift',
      title: '(Redshift) Screen View Events Table',
      longDescription: 'The table name for your screen view events.',
      packageDefault: 'com_snowplowanalytics_mobile_screen_view_1',
      group: 'Warehouse Specific',
    },
    snowplow__enable_load_tstamp: {
      type: 'boolean',
      warehouse: 'Redshift',
      title: '(Redshift) Enable load_tstamp',
      longDescription: 'Flag to include the `load_tstamp` column in the base events this run model. This should be set to true (the default) unless you are using the Postgres loader or an RDB loader version less than 4.0.0. It must be true to use consent models on Postgres and Redshift.',
      packageDefault: 'true',
      group: 'Warehouse Specific',
    },
    snowplow__derived_tstamp_partitioned: {
      type: 'boolean',
      warehouse: 'Bigquery',
      title: '(Bigquery) Dervied Timestamp Partition',
      longDescription: 'Boolean to enable filtering the events table on `derived_tstamp` in addition to `collector_tstamp`.',
      packageDefault: 'true',
      group: 'Warehouse Specific',
    },
    snowplow__session_identifiers: {
      type: 'string',
      title: 'Session Identifiers',
      group: 'Operation and Logic',
      longDescription: 'A list of key:value dictionaries which contain all of the contexts and fields where your session identifiers are located. For each entry in the list, if your map contains the `schema` value `atomic`, then this refers to a field found directly in the atomic `events` table. If you are trying to introduce a context/entity with an identifier in it, the package will look for the context in your events table with the name specified in the `schema` field. It will use the specified value in the `field` key as the field name to access. For Redshift/Postgres, using the `schema` key the package will try to find a table in your `snowplow__events_schema` schema with the same name as the `schema` value provided, and join that. If multiple fields are specified, the package will try to coalesce all fields in the order specified in the list. For a better understanding of the advanced usage of this variable, please see the [Utils advanced operation](/docs/modeling-your-data/modeling-your-data-with-dbt/dbt-models/dbt-utils-data-model/dbt-utils-advanced-operation/) section for more details.',
      packageDefault: '[{"schema" : "contexts_com_snowplowanalytics_snowplow_client_session_1", "field" : "session_id"}]',
      type: 'array',
      description: '> Click the plus sign to add a new entry',
      minItems: 0,
      items: {
        type: 'object',
        title: "Identifier",
        properties: {
          schema: { type: 'string', description: 'The schema name of your events table, atomic in most use cases, alternatively for sdes/contexts this should instead be the name of the field itself' }, // TODO: add regex here to make valid context/unstruct or atomic?
          field: { type: 'string', description: 'The name of the field to use as session identifier, alternatively, in case of sdes/contexts it is the name of the element that refers to the field to be extracted' } // TODO: add regex here to make valid SQL name?
        },
        required: ['schema', 'field'],
        additionalProperties: false
      },
      uniqueItems: true,
    },
    snowplow__session_sql: {
      type: 'string',
      title: 'SQL for your session identifier',
      longDescription: 'This allows you to override the `session_identifiers` SQL, to define completely custom SQL in order to build out a session identifier for your events. If you are interested in using this instead of providing identifiers through the `session_identifiers` variable, please see the [Utils advanced operation](/docs/modeling-your-data/modeling-your-data-with-dbt/dbt-models/dbt-utils-data-model/dbt-utils-advanced-operation/) section for more details on how to do that.',
      packageDefault: '',
      group: 'Operation and Logic',
    },
    snowplow__session_timestamp: {
      type: 'string',
      title: 'Timestamp used for incremental processing, should be your partition field',
      group: 'Operation and Logic',
      longDescription: "Determines which timestamp is used to build the sessionization logic. It's a good idea to have this timestamp be the same timestamp as the field you partition your events table on.",
      packageDefault: 'collector_tstamp',
    },
    snowplow__user_identifiers: {
      type: 'string',
      title: 'User Identifiers',
      group: 'Operation and Logic',
      longDescription: 'A list of key:value dictionaries which contain all of the contexts and fields where your user identifiers are located. For each entry in the list, if your map contains the `schema` value `atomic`, then this refers to a field found directly in the atomic `events` table. If you are trying to introduce a context/entity with an identifier in it, the package will look for the context in your events table with the name specified in the `schema` field. It will use the specified value in the `field` key as the field name to access. For Redshift/Postgres, using the `schema` key the package will try to find a table in your `snowplow__events_schema` schema with the same name as the `schema` value provided, and join that. If multiple fields are specified, the package will try to coalesce all fields in the order specified in the list. For a better understanding of the advanced usage of this variable, please see the [Utils advanced operation](/docs/modeling-your-data/modeling-your-data-with-dbt/dbt-models/dbt-utils-data-model/dbt-utils-advanced-operation/) section for more details.',
      packageDefault: '[{"schema" : "contexts_com_snowplowanalytics_snowplow_client_session_1", "field" : "user_id"}]',
      type: 'array',
      description: '> Click the plus sign to add a new entry',
      minItems: 0,
      items: {
        type: 'object',
        title: "Identifier",
        properties: {
          schema: { type: 'string', description: 'The schema name of your events table, atomic in most use cases, alternatively for sdes/contexts this should instead be the name of the field itself' }, // TODO: add regex here to make valid context/unstruct or atomic?
          field: { type: 'string', description: 'The name of the field to use as user identifier, alternatively, in case of sdes/contexts it is the name of the element that refers to the field to be extracted' } // TODO: add regex here to make valid SQL name?
        },
        required: ['schema', 'field'],
        additionalProperties: false
      },
      uniqueItems: true,
    },
    snowplow__user_sql: {
      type: 'string',
      title: 'SQL for your user identifier',
      longDescription: 'This allows you to override the `user_identifiers` SQL, to define completely custom SQL in order to build out a user identifier for your events. If you are interested in using this instead of providing identifiers through the `user_identifiers` variable, please see the [Utils advanced operation](/docs/modeling-your-data/modeling-your-data-with-dbt/dbt-models/dbt-utils-data-model/dbt-utils-advanced-operation/) section for more details on how to do that.',
      packageDefault: '',
      group: 'Operation and Logic',
    },
    snowplow__screen_view_passthroughs: {
      title: 'Screen View Passthroughs',
      group: 'Contexts, Filters, and Logs',
      longDescription: 'Field(s) to carry through from the events table to the derived table. The field is from the `screen_view` event record. Aggregation is not supported. A list of either flat column names from the events table or a dictionary with the keys `sql` for the SQL code to select the column and `alias` for the alias of the column in the output.',
      packageDefault: '[ ] (no passthroughs)',
      $ref: '#/definitions/passthrough_vars'
    },
    snowplow__session_passthroughs: {
      title: 'Session Passthroughs',
      group: 'Contexts, Filters, and Logs',
      longDescription: 'Field(s) to carry through from the events table to the derived table. The field is based on the first `page_view` or `page_ping` event for that session. Aggregation is not supported. A list of either flat column names from the events table or a dictionary with the keys `sql` for the SQL code to select the column and `alias` for the alias of the column in the output.',
      packageDefault: '[ ] (no passthroughs)',
      $ref: '#/definitions/passthrough_vars'
    },
    snowplow__user_first_passthroughs: {
      title: 'User First Passthroughs',
      group: 'Contexts, Filters, and Logs',
      longDescription: ' Field(s) to carry through from the events table to the derived table. The field is based on the first session record for that user. Aggregation is not supported. A list of either flat column names from the events table or a dictionary with the keys `sql` for the SQL code to select the column and `alias` for the alias of the column in the output.',
      packageDefault: '[ ] (no passthroughs)',
      $ref: '#/definitions/passthrough_vars'
    },
    snowplow__user_last_passthroughs: {
      title: 'User Last Passthroughs',
      group: 'Contexts, Filters, and Logs',
      longDescription: 'Field(s) to carry through from the events table to the derived table. The field is based on the last session record for that user. Aggregation is not supported. A list of either flat column names from the events table or a dictionary with the keys `sql` for the SQL code to select the column and `alias` for the alias of the column in the output. Note flat fields will be aliased with a `last_` prefix, dictionary provided aliases will not by default.',
      packageDefault: '[ ] (no passthroughs)',
      $ref: '#/definitions/passthrough_vars'
    },
    snowplow__entities_or_sdes: {
      type: 'string',
      title: '(Redshift) Entities or SDEs',
      longDescription: 'A list of dictionaries defining the `entity` or `self-describing` event tables to join onto your base events table. Please use the tool below or see the section on [Utilizing custom contexts or SDEs](/docs/modeling-your-data/modeling-your-data-with-dbt/dbt-models/dbt-utils-data-model/dbt-utils-advanced-operation/?warehouse=redshift%2Bpostgres#utilizing-custom-contexts-or-sdes) for details of the structure.',
      packageDefault: '[]',
      warehouse: 'Redshift',
      group: 'Warehouse Specific',
      type: 'array',
      description: '> Click the plus sign to add a new entry',
      minItems: 0,
      items: {
        type: 'object',
        title: "Entity or SDE",
        properties: {
          schema: { type: 'string', description: 'Table name' }, // TODO: add regex here to make valid context/unstruct table name
          prefix: { type: 'string', description: 'Prefix to add to columns' }, // TODO: add regex here to make valid SQL name?
          alias: { type: 'string', description: 'Table alias for the subquery' }, // TODO: add regex here to make valid SQL alias?
          single_entity: { type: 'boolean', title: 'Is single entity?' }
        },
        required: ['name', 'prefix'],
        additionalProperties: false
      },
      uniqueItems: true,
    },
  },
}
