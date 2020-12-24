#Cases

#express-validator
#db erorr
http POST :3007/users/express-validator email=db-error@mail.com password=testm;
#wrong email
http POST :3007/users/express-validator email=wrong-email password=testm;
#short pass
http POST :3007/users/express-validator email=email@mail.com password=tes;

#joi
#wrong email
http POST :3007/users/joi-validator email=wrong-email password=testm;
#short pass
http POST :3007/users/joi-validator email=email@mail.com password=tes;


#operational
http :3007/users/unhandled-operational
#not operational
http :3007/users/unhandled-not-operational