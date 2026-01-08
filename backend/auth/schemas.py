from pydantic import BaseModel, Field

class CreateUserRequest(BaseModel):

    username: str = Field(...,min_length=3, max_length=50)
    password: str = Field(...,min_length=6, max_length=72)

class Token(BaseModel):

    access_token : str
    token_type : str