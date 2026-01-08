from fastapi import FastAPI
from auth.views import router as auth_router
from profile.views import router as profile_router
from posts.views import router as posts_router
from services.database import Base, engine
from chat.views import router as chat_router
from fastapi.middleware.cors import CORSMiddleware
from friends.views import router as friends_router

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://react-python-rgzt15zol-ali-mujahids-projects.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(profile_router)
app.include_router(posts_router)
app.include_router(chat_router)
app.include_router(friends_router)
