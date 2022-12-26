@REM echo import * as $protobuf from "protobufjs"; >> %PBTS_OUT_DIR%\auth_pb.js
@REM type %PBTS_OUT_DIR%\auth_pb_tmp.js >>  %PBTS_OUT_DIR%\auth_pb.js
@REM del  %PBTS_OUT_DIR%\auth_pb_tmp.js

@REM %PBTS_BIN_DIR%\pbts -o %PBTS_OUT_DIR%\auth_pb.d.ts  %PBTS_OUT_DIR%\auth_pb.js


%PBTS_BIN_DIR%\pbjs -t static -w es6 %PROTO_PATH%\%DOMAIN%.proto --no-create --no-encode --no-decode --no-verify --no-delimited --force-number -o %PBTS_OUT_DIR%\%DOMAIN%_pb_tmp.js