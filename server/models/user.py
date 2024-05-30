def RegisterModel(Database):
    
    QueryName = "User"
    TableName = "Users"

    class User(Database.Model):

        __tablename__ = TableName
        id = Database.Column(Database.Integer, primary_key=True)
        email = Database.Column(Database.String(40))
        password = Database.Column(Database.String(40))
        firstName = Database.Column(Database.String(20))
        lastName = Database.Column(Database.String(20))

        def __init__(self, email, password, firstName, lastName):
            self.email = email
            self.password = password #need to salt + hash
            self.firstName = firstName
            self.lastName = lastName
            
    return User, QueryName