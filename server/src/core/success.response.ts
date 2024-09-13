const StatusCode = {
    OK: 200,
    CREATED: 201,
}

const ReasonStatusCode = {
    OK: 'Success',
    CREATED: 'Created',
}

interface SuccessResponseProps {
    message?: string
    statusCode?: number
    reasonStatusCode?: string
    metadata?: Record<string, any>
}

class SuccessResponse {
    public message: string;
    public status: number;
    public metadata: Record<string, any>;
  
    constructor({
      message,
      statusCode = StatusCode.OK,
      reasonStatusCode = ReasonStatusCode.OK,
      metadata = {},
    }: SuccessResponseProps) {
      this.message = message ?? reasonStatusCode;
      this.status = statusCode;
      this.metadata = metadata;
    }
    send(res: any, headers: Record<string, string> = {}): any {
        Object.entries(headers).forEach(([key, value]) => {
          res.setHeader(key, value);
        });
    
        return res.status(this.status).json(this);
    }
}


class OK extends SuccessResponse {
    constructor({ message, metadata }: { message?: string; metadata?: Record<string, any> }) {
      super({ message, metadata });
    }
}

interface CreatedResponseProps extends SuccessResponseProps {
    options?: Record<string, any>;
}
  
class CREATED extends SuccessResponse {
    public options: Record<string, any> | undefined;
  
    constructor({
      message,
      statusCode = StatusCode.CREATED,
      reasonStatusCode = ReasonStatusCode.CREATED,
      metadata,
      options,
    }: CreatedResponseProps) {
      super({ message, statusCode, reasonStatusCode, metadata });
      this.options = options;
    }
}


export {
    OK,
    CREATED,
    SuccessResponse
}