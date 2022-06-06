import uuid
import random

#for x in range(0, 35):
print(uuid.uuid4())
for x in range(0, 7):
  print(random.uniform(2.0, 21.0))

mine = ["Ice Cream Show", "Coolidge Park"]
print([word.replace(" ", "_").lower() for word in mine])
