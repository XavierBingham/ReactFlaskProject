def RegisterModel(Database):
    
    QueryName = "RefreshToken"
    TableName = "RefreshTokens"

    class RefreshToken(Database.Model):

        __tablename__ = TableName
        id = Database.Column(Database.Integer, primary_key = True, nullable = False, autoincrement = True)
        user_id = Database.Column(Database.Integer, nullable = False)
        token = Database.Column(Database.String, nullable = False)
        exp = Database.Column(Database.DateTime(timezone=True), nullable = False)
        iat = Database.Column(Database.DateTime(timezone=True), nullable = False)

        def __init__(self, user_id, token, exp, iat):
            self.user_id = user_id
            self.token = token
            self.exp = exp
            self.iat = iat
            
    return RefreshToken, QueryName