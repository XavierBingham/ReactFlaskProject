def RegisterModel(Database):
    
    QueryName = "User"
    TableName = "Users"

    class User(Database.Model):

        __tablename__ = TableName
        user_id = Database.Column(Database.Integer, primary_key = True, nullable = False, autoincrement = True)
        email = Database.Column(Database.String(40), nullable = False, unique = True)
        password = Database.Column(Database.String(40), nullable = False)
        firstName = Database.Column(Database.String(20), nullable = False)
        lastName = Database.Column(Database.String(20), nullable = False)

        def __init__(self, email, password, firstName, lastName):
            self.email = email
            self.password = password #need to salt + hash
            self.firstName = firstName
            self.lastName = lastName
            
    return User, QueryName