def main():
    try:
        from sqlalchemy.ext.asyncio import create_async_engine

        print("Асинхронная версия SQLAlchemy установлена.")
    except ImportError:
        print("Асинхронная версия SQLAlchemy не установлена.")


if __name__ == "__main__":
    main()
