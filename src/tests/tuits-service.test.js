import {
  findAllTuits,
  findTuitById,
  findTuitByUser,
  createTuit,
  updateTuit,
  deleteTuit,
} from '../services/tuits-service';

import {
  createUser,
  deleteUsersByUsername,
  findAllUsers,
  findUserById,
} from '../services/users-service';

describe('can create tuit with REST API', () => {
  const ripley = {
    username: 'ellenripley',
    password: 'lv426',
    email: 'ellenripley@aliens.com',
  };

  const sampleTuit = {
    tuit: 'Hello World!!!',
  };

  beforeAll(() => {
    return deleteUsersByUsername(ripley.username);
  });

  // clean up after test runs
  afterAll(() => {
    return deleteUsersByUsername(ripley.username);
  });

  test('can create tuit with REST API', async () => {
    const newUser = await createUser(ripley);
    // verify new user matches the parameter user
    expect(newUser.username).toEqual(ripley.username);
    expect(newUser.password).toEqual(ripley.password);
    expect(newUser.email).toEqual(ripley.email);

    const newTuit = await createTuit(newUser._id, sampleTuit);

    expect(newTuit.postedBy).toEqual(newUser._id);
    expect(newTuit.tuit).toEqual(sampleTuit.tuit);

    const status = await deleteTuit(newTuit._id);
    expect(status.deletedCount).toBeGreaterThanOrEqual(1);
  });
});

describe('can delete tuit wtih REST API', () => {
  const ripley = {
    username: 'ellenripley',
    password: 'lv426',
    email: 'ellenripley@aliens.com',
  };

  const sampleTuit = {
    tuit: 'Hello World!!!',
  };

  beforeAll(() => {
    return deleteUsersByUsername(ripley.username);
  });

  // clean up after test runs
  afterAll(() => {
    return deleteUsersByUsername(ripley.username);
  });

  test('can create tuit with REST API', async () => {
    const newUser = await createUser(ripley);
    // verify new user matches the parameter user
    expect(newUser.username).toEqual(ripley.username);
    expect(newUser.password).toEqual(ripley.password);
    expect(newUser.email).toEqual(ripley.email);

    const newTuit = await createTuit(newUser._id, sampleTuit);

    const status = await deleteTuit(newTuit._id);
    expect(status.deletedCount).toBeGreaterThanOrEqual(1);
  });
});

describe('can retrieve a tuit by their primary key with REST API', () => {
  const ripley = {
    username: 'ellenripley',
    password: 'lv426',
    email: 'ellenripley@aliens.com',
  };

  const sampleTuit = {
    tuit: 'Hello World!!!',
  };

  beforeAll(() => {
    deleteUsersByUsername(ripley.username);
  });

  // clean up after test runs
  afterAll(() => {
    deleteUsersByUsername(ripley.username);
  });

  test('can retrieve a tuit by their primary key with REST API', async () => {
    const newUser = await createUser(ripley);
    // verify new user matches the parameter user
    expect(newUser.username).toEqual(ripley.username);
    expect(newUser.password).toEqual(ripley.password);
    expect(newUser.email).toEqual(ripley.email);

    const newTuit = await createTuit(newUser._id, sampleTuit);
    const retrievedTuit = await findTuitById(newTuit._id);

    expect(retrievedTuit.postedBy._id).toEqual(newUser._id);
    expect(retrievedTuit.tuit).toEqual(newTuit.tuit);

    const status = await deleteTuit(newTuit._id);
    expect(status.deletedCount).toBeGreaterThanOrEqual(1);
  });
});

describe('can retrieve all tuits with REST API', () => {
  // TODO: implement this
  const usernames = ['larry', 'curley', 'moe'];

  beforeAll(() =>
    Promise.all(usernames.map((username) => deleteUsersByUsername(username)))
  );

  afterAll(() =>
    Promise.all(usernames.map((username) => deleteUsersByUsername(username)))
  );

  test('can retrieve all tuits from REST API', async () => {
    const users = await findAllUsers();

    const sampleTuits = users.map((user) =>
      createTuit(user._id, { tuit: `Hello ${user.username}` })
    );
    const retrievedTuits = await findAllTuits();
    expect(retrievedTuits.length).toBeGreaterThanOrEqual(sampleTuits.length);

    const tuitsInserted = retrievedTuits.filter(
      (tuit) =>
        sampleTuits.indexOf({ postedBy: tuit.postedBy, tuit: tuit.tuit }) >= 0
    );

    tuitsInserted.forEach((insertedTuit) => {
      const tuit = sampleTuits.find(
        (sampleTuit) =>
          sampleTuit.postedBy === insertedTuit.postedBy &&
          sampleTuit.tuit === insertedTuit.tuit
      );
      expect(tuit.postedBy).toEqual(insertedTuit.postedBy);
      expect(tuit.tuit).toEqual(insertedTuit.tuit);
    });

    tuitsInserted.forEach((insertedTuit) => {
      const status = deleteTuit(insertedTuit._id);
      expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    });
  });
});
