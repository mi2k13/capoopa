DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql', # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
		#'NAME': 'capoopa',                      # Or path to database file if using sqlite3.
        #'USER': 'root',                      # Not used with sqlite3.
        #'PASSWORD': '',                  # Not used with sqlite3.
        #'HOST': '',
        'NAME': 'capoopa_test',                      # Or path to database file if using sqlite3.
        'USER': 'capoopa',                      # Not used with sqlite3.
        'PASSWORD': 'azerty123',                  # Not used with sqlite3.
        'HOST': 'mysql2.alwaysdata.com',                      # Set to empty string for localhost. Not used with sqlite3.
        'PORT': '',                      # Set to empty string for default. Not used with sqlite3.
    }
}