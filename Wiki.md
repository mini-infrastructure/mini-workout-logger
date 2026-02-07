---
title: 🤸 Mini Workout Logger v1.0.0
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="-mini-workout-logger">🤸 Mini Workout Logger v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

Base URLs:

* <a href="http://localhost:9090">http://localhost:9090</a>

<h1 id="-mini-workout-logger-muscle">Muscle</h1>

Muscle API

## getById_1

<a id="opIdgetById_1"></a>

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:9090/muscles/{id} \
  -H 'Accept: */*'

```

```http
GET http://localhost:9090/muscles/{id} HTTP/1.1
Host: localhost:9090
Accept: */*

```

```javascript

const headers = {
  'Accept':'*/*'
};

fetch('http://localhost:9090/muscles/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => '*/*'
}

result = RestClient.get 'http://localhost:9090/muscles/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': '*/*'
}

r = requests.get('http://localhost:9090/muscles/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => '*/*',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:9090/muscles/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:9090/muscles/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"*/*"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:9090/muscles/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /muscles/{id}`

*Get entity by ID*

<h3 id="getbyid_1-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer(int64)|true|none|
|lang|query|string|false|Language|

#### Enumerated Values

|Parameter|Value|
|---|---|
|lang|en_US|
|lang|pt_BR|

> Example responses

> 200 Response

<h3 id="getbyid_1-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ResponseDTOMuscleReadDTO](#schemaresponsedtomusclereaddto)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[ResponseDTOVoid](#schemaresponsedtovoid)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[ResponseDTOVoid](#schemaresponsedtovoid)|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|Conflict|[ResponseDTOVoid](#schemaresponsedtovoid)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[ResponseDTOVoid](#schemaresponsedtovoid)|

<aside class="success">
This operation does not require authentication
</aside>

## update_1

<a id="opIdupdate_1"></a>

> Code samples

```shell
# You can also use wget
curl -X PUT http://localhost:9090/muscles/{id} \
  -H 'Content-Type: application/json' \
  -H 'Accept: */*'

```

```http
PUT http://localhost:9090/muscles/{id} HTTP/1.1
Host: localhost:9090
Content-Type: application/json
Accept: */*

```

```javascript
const inputBody = '{
  "name": "string",
  "muscle_group_ids": [
    0
  ]
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'*/*'
};

fetch('http://localhost:9090/muscles/{id}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => '*/*'
}

result = RestClient.put 'http://localhost:9090/muscles/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': '*/*'
}

r = requests.put('http://localhost:9090/muscles/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => '*/*',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','http://localhost:9090/muscles/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:9090/muscles/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"*/*"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "http://localhost:9090/muscles/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /muscles/{id}`

*Update an existing entity*

> Body parameter

```json
{
  "name": "string",
  "muscle_group_ids": [
    0
  ]
}
```

<h3 id="update_1-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer(int64)|true|none|
|lang|query|string|false|Language|
|body|body|[MuscleWriteDTO](#schemamusclewritedto)|true|none|

#### Enumerated Values

|Parameter|Value|
|---|---|
|lang|en_US|
|lang|pt_BR|

> Example responses

> 200 Response

<h3 id="update_1-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ResponseDTOMuscleReadDTO](#schemaresponsedtomusclereaddto)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[ResponseDTOVoid](#schemaresponsedtovoid)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[ResponseDTOVoid](#schemaresponsedtovoid)|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|Conflict|[ResponseDTOVoid](#schemaresponsedtovoid)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[ResponseDTOVoid](#schemaresponsedtovoid)|

<aside class="success">
This operation does not require authentication
</aside>

## delete_1

<a id="opIddelete_1"></a>

> Code samples

```shell
# You can also use wget
curl -X DELETE http://localhost:9090/muscles/{id} \
  -H 'Accept: */*'

```

```http
DELETE http://localhost:9090/muscles/{id} HTTP/1.1
Host: localhost:9090
Accept: */*

```

```javascript

const headers = {
  'Accept':'*/*'
};

fetch('http://localhost:9090/muscles/{id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => '*/*'
}

result = RestClient.delete 'http://localhost:9090/muscles/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': '*/*'
}

r = requests.delete('http://localhost:9090/muscles/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => '*/*',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('DELETE','http://localhost:9090/muscles/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:9090/muscles/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"*/*"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "http://localhost:9090/muscles/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /muscles/{id}`

*Delete an entity by ID*

<h3 id="delete_1-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer(int64)|true|none|
|lang|query|string|false|Language|

#### Enumerated Values

|Parameter|Value|
|---|---|
|lang|en_US|
|lang|pt_BR|

> Example responses

> 200 Response

<h3 id="delete_1-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ResponseDTOMuscleReadDTO](#schemaresponsedtomusclereaddto)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[ResponseDTOVoid](#schemaresponsedtovoid)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[ResponseDTOVoid](#schemaresponsedtovoid)|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|Conflict|[ResponseDTOVoid](#schemaresponsedtovoid)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[ResponseDTOVoid](#schemaresponsedtovoid)|

<aside class="success">
This operation does not require authentication
</aside>

## getAll_1

<a id="opIdgetAll_1"></a>

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:9090/muscles \
  -H 'Accept: */*'

```

```http
GET http://localhost:9090/muscles HTTP/1.1
Host: localhost:9090
Accept: */*

```

```javascript

const headers = {
  'Accept':'*/*'
};

fetch('http://localhost:9090/muscles',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => '*/*'
}

result = RestClient.get 'http://localhost:9090/muscles',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': '*/*'
}

r = requests.get('http://localhost:9090/muscles', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => '*/*',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:9090/muscles', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:9090/muscles");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"*/*"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:9090/muscles", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /muscles`

*Get all entities*

<h3 id="getall_1-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|lang|query|string|false|Language|

#### Enumerated Values

|Parameter|Value|
|---|---|
|lang|en_US|
|lang|pt_BR|

> Example responses

> 200 Response

<h3 id="getall_1-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ResponseDTOMuscleReadDTO](#schemaresponsedtomusclereaddto)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[ResponseDTOVoid](#schemaresponsedtovoid)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[ResponseDTOVoid](#schemaresponsedtovoid)|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|Conflict|[ResponseDTOVoid](#schemaresponsedtovoid)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[ResponseDTOVoid](#schemaresponsedtovoid)|

<aside class="success">
This operation does not require authentication
</aside>

## create_1

<a id="opIdcreate_1"></a>

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:9090/muscles \
  -H 'Content-Type: application/json' \
  -H 'Accept: */*'

```

```http
POST http://localhost:9090/muscles HTTP/1.1
Host: localhost:9090
Content-Type: application/json
Accept: */*

```

```javascript
const inputBody = '{
  "name": "string",
  "muscle_group_ids": [
    0
  ]
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'*/*'
};

fetch('http://localhost:9090/muscles',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => '*/*'
}

result = RestClient.post 'http://localhost:9090/muscles',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': '*/*'
}

r = requests.post('http://localhost:9090/muscles', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => '*/*',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:9090/muscles', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:9090/muscles");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"*/*"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:9090/muscles", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /muscles`

*Create a new entity*

> Body parameter

```json
{
  "name": "string",
  "muscle_group_ids": [
    0
  ]
}
```

<h3 id="create_1-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|lang|query|string|false|Language|
|body|body|[MuscleWriteDTO](#schemamusclewritedto)|true|none|

#### Enumerated Values

|Parameter|Value|
|---|---|
|lang|en_US|
|lang|pt_BR|

> Example responses

> 200 Response

<h3 id="create_1-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ResponseDTOMuscleReadDTO](#schemaresponsedtomusclereaddto)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[ResponseDTOVoid](#schemaresponsedtovoid)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[ResponseDTOVoid](#schemaresponsedtovoid)|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|Conflict|[ResponseDTOVoid](#schemaresponsedtovoid)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[ResponseDTOVoid](#schemaresponsedtovoid)|

<aside class="success">
This operation does not require authentication
</aside>

## getParentMuscles

<a id="opIdgetParentMuscles"></a>

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:9090/muscles/{muscleId}/parents \
  -H 'Accept: */*'

```

```http
GET http://localhost:9090/muscles/{muscleId}/parents HTTP/1.1
Host: localhost:9090
Accept: */*

```

```javascript

const headers = {
  'Accept':'*/*'
};

fetch('http://localhost:9090/muscles/{muscleId}/parents',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => '*/*'
}

result = RestClient.get 'http://localhost:9090/muscles/{muscleId}/parents',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': '*/*'
}

r = requests.get('http://localhost:9090/muscles/{muscleId}/parents', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => '*/*',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:9090/muscles/{muscleId}/parents', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:9090/muscles/{muscleId}/parents");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"*/*"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:9090/muscles/{muscleId}/parents", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /muscles/{muscleId}/parents`

<h3 id="getparentmuscles-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|muscleId|path|integer(int64)|true|none|
|lang|query|string|false|Language|

#### Enumerated Values

|Parameter|Value|
|---|---|
|lang|en_US|
|lang|pt_BR|

> Example responses

> 200 Response

<h3 id="getparentmuscles-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ResponseDTOMuscleReadDTO](#schemaresponsedtomusclereaddto)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[ResponseDTOVoid](#schemaresponsedtovoid)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[ResponseDTOVoid](#schemaresponsedtovoid)|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|Conflict|[ResponseDTOVoid](#schemaresponsedtovoid)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[ResponseDTOVoid](#schemaresponsedtovoid)|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="-mini-workout-logger-set">Set</h1>

Set API

## listSets

<a id="opIdlistSets"></a>

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:9090/workouts/{id}/exercises/{exerciseId}/sets \
  -H 'Accept: */*'

```

```http
GET http://localhost:9090/workouts/{id}/exercises/{exerciseId}/sets HTTP/1.1
Host: localhost:9090
Accept: */*

```

```javascript

const headers = {
  'Accept':'*/*'
};

fetch('http://localhost:9090/workouts/{id}/exercises/{exerciseId}/sets',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => '*/*'
}

result = RestClient.get 'http://localhost:9090/workouts/{id}/exercises/{exerciseId}/sets',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': '*/*'
}

r = requests.get('http://localhost:9090/workouts/{id}/exercises/{exerciseId}/sets', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => '*/*',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:9090/workouts/{id}/exercises/{exerciseId}/sets', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:9090/workouts/{id}/exercises/{exerciseId}/sets");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"*/*"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:9090/workouts/{id}/exercises/{exerciseId}/sets", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /workouts/{id}/exercises/{exerciseId}/sets`

<h3 id="listsets-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer(int64)|true|none|
|exerciseId|path|integer(int64)|true|none|
|lang|query|string|false|Language|

#### Enumerated Values

|Parameter|Value|
|---|---|
|lang|en_US|
|lang|pt_BR|

> Example responses

> 200 Response

<h3 id="listsets-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ResponseDTOSetReadDTO](#schemaresponsedtosetreaddto)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[ResponseDTOVoid](#schemaresponsedtovoid)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[ResponseDTOVoid](#schemaresponsedtovoid)|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|Conflict|[ResponseDTOVoid](#schemaresponsedtovoid)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[ResponseDTOVoid](#schemaresponsedtovoid)|

<aside class="success">
This operation does not require authentication
</aside>

## addSet

<a id="opIdaddSet"></a>

> Code samples

```shell
# You can also use wget
curl -X PUT http://localhost:9090/workouts/{id}/exercises/{exerciseId}/sets \
  -H 'Content-Type: application/json' \
  -H 'Accept: */*'

```

```http
PUT http://localhost:9090/workouts/{id}/exercises/{exerciseId}/sets HTTP/1.1
Host: localhost:9090
Content-Type: application/json
Accept: */*

```

```javascript
const inputBody = '{
  "category": "NORMAL",
  "type": "REPS",
  "repetitions": 0,
  "weight": 0.1,
  "duration_seconds": 0
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'*/*'
};

fetch('http://localhost:9090/workouts/{id}/exercises/{exerciseId}/sets',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => '*/*'
}

result = RestClient.put 'http://localhost:9090/workouts/{id}/exercises/{exerciseId}/sets',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': '*/*'
}

r = requests.put('http://localhost:9090/workouts/{id}/exercises/{exerciseId}/sets', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => '*/*',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','http://localhost:9090/workouts/{id}/exercises/{exerciseId}/sets', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:9090/workouts/{id}/exercises/{exerciseId}/sets");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"*/*"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "http://localhost:9090/workouts/{id}/exercises/{exerciseId}/sets", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /workouts/{id}/exercises/{exerciseId}/sets`

> Body parameter

```json
{
  "category": "NORMAL",
  "type": "REPS",
  "repetitions": 0,
  "weight": 0.1,
  "duration_seconds": 0
}
```

<h3 id="addset-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer(int64)|true|none|
|exerciseId|path|integer(int64)|true|none|
|lang|query|string|false|Language|
|body|body|[SetWriteDTO](#schemasetwritedto)|true|none|

#### Enumerated Values

|Parameter|Value|
|---|---|
|lang|en_US|
|lang|pt_BR|

> Example responses

> 200 Response

<h3 id="addset-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ResponseDTOSetReadDTO](#schemaresponsedtosetreaddto)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[ResponseDTOVoid](#schemaresponsedtovoid)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[ResponseDTOVoid](#schemaresponsedtovoid)|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|Conflict|[ResponseDTOVoid](#schemaresponsedtovoid)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[ResponseDTOVoid](#schemaresponsedtovoid)|

<aside class="success">
This operation does not require authentication
</aside>

## reorderSet

<a id="opIdreorderSet"></a>

> Code samples

```shell
# You can also use wget
curl -X PUT http://localhost:9090/workouts/{id}/exercises/{exerciseId}/sets/reorder/{setId}?newPosition=0 \
  -H 'Accept: */*'

```

```http
PUT http://localhost:9090/workouts/{id}/exercises/{exerciseId}/sets/reorder/{setId}?newPosition=0 HTTP/1.1
Host: localhost:9090
Accept: */*

```

```javascript

const headers = {
  'Accept':'*/*'
};

fetch('http://localhost:9090/workouts/{id}/exercises/{exerciseId}/sets/reorder/{setId}?newPosition=0',
{
  method: 'PUT',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => '*/*'
}

result = RestClient.put 'http://localhost:9090/workouts/{id}/exercises/{exerciseId}/sets/reorder/{setId}',
  params: {
  'newPosition' => 'integer(int32)'
}, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': '*/*'
}

r = requests.put('http://localhost:9090/workouts/{id}/exercises/{exerciseId}/sets/reorder/{setId}', params={
  'newPosition': '0'
}, headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => '*/*',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','http://localhost:9090/workouts/{id}/exercises/{exerciseId}/sets/reorder/{setId}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:9090/workouts/{id}/exercises/{exerciseId}/sets/reorder/{setId}?newPosition=0");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"*/*"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "http://localhost:9090/workouts/{id}/exercises/{exerciseId}/sets/reorder/{setId}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /workouts/{id}/exercises/{exerciseId}/sets/reorder/{setId}`

<h3 id="reorderset-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer(int64)|true|none|
|exerciseId|path|integer(int64)|true|none|
|setId|path|integer(int64)|true|none|
|newPosition|query|integer(int32)|true|none|
|lang|query|string|false|Language|

#### Enumerated Values

|Parameter|Value|
|---|---|
|lang|en_US|
|lang|pt_BR|

> Example responses

> 200 Response

<h3 id="reorderset-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ResponseDTOSetReadDTO](#schemaresponsedtosetreaddto)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[ResponseDTOVoid](#schemaresponsedtovoid)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[ResponseDTOVoid](#schemaresponsedtovoid)|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|Conflict|[ResponseDTOVoid](#schemaresponsedtovoid)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[ResponseDTOVoid](#schemaresponsedtovoid)|

<aside class="success">
This operation does not require authentication
</aside>

## removeSet

<a id="opIdremoveSet"></a>

> Code samples

```shell
# You can also use wget
curl -X PUT http://localhost:9090/workouts/{id}/exercises/{exerciseId}/sets/remove/{setId} \
  -H 'Accept: */*'

```

```http
PUT http://localhost:9090/workouts/{id}/exercises/{exerciseId}/sets/remove/{setId} HTTP/1.1
Host: localhost:9090
Accept: */*

```

```javascript

const headers = {
  'Accept':'*/*'
};

fetch('http://localhost:9090/workouts/{id}/exercises/{exerciseId}/sets/remove/{setId}',
{
  method: 'PUT',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => '*/*'
}

result = RestClient.put 'http://localhost:9090/workouts/{id}/exercises/{exerciseId}/sets/remove/{setId}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': '*/*'
}

r = requests.put('http://localhost:9090/workouts/{id}/exercises/{exerciseId}/sets/remove/{setId}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => '*/*',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','http://localhost:9090/workouts/{id}/exercises/{exerciseId}/sets/remove/{setId}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:9090/workouts/{id}/exercises/{exerciseId}/sets/remove/{setId}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"*/*"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "http://localhost:9090/workouts/{id}/exercises/{exerciseId}/sets/remove/{setId}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /workouts/{id}/exercises/{exerciseId}/sets/remove/{setId}`

<h3 id="removeset-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer(int64)|true|none|
|exerciseId|path|integer(int64)|true|none|
|setId|path|integer(int64)|true|none|
|lang|query|string|false|Language|

#### Enumerated Values

|Parameter|Value|
|---|---|
|lang|en_US|
|lang|pt_BR|

> Example responses

> 200 Response

<h3 id="removeset-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ResponseDTOSetReadDTO](#schemaresponsedtosetreaddto)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[ResponseDTOVoid](#schemaresponsedtovoid)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[ResponseDTOVoid](#schemaresponsedtovoid)|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|Conflict|[ResponseDTOVoid](#schemaresponsedtovoid)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[ResponseDTOVoid](#schemaresponsedtovoid)|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="-mini-workout-logger-exercise">Exercise</h1>

Exercise API

## getById_2

<a id="opIdgetById_2"></a>

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:9090/exercises/{id} \
  -H 'Accept: */*'

```

```http
GET http://localhost:9090/exercises/{id} HTTP/1.1
Host: localhost:9090
Accept: */*

```

```javascript

const headers = {
  'Accept':'*/*'
};

fetch('http://localhost:9090/exercises/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => '*/*'
}

result = RestClient.get 'http://localhost:9090/exercises/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': '*/*'
}

r = requests.get('http://localhost:9090/exercises/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => '*/*',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:9090/exercises/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:9090/exercises/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"*/*"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:9090/exercises/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /exercises/{id}`

*Get entity by ID*

<h3 id="getbyid_2-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer(int64)|true|none|
|lang|query|string|false|Language|

#### Enumerated Values

|Parameter|Value|
|---|---|
|lang|en_US|
|lang|pt_BR|

> Example responses

> 200 Response

<h3 id="getbyid_2-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ResponseDTOExerciseReadDTO](#schemaresponsedtoexercisereaddto)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[ResponseDTOVoid](#schemaresponsedtovoid)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[ResponseDTOVoid](#schemaresponsedtovoid)|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|Conflict|[ResponseDTOVoid](#schemaresponsedtovoid)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[ResponseDTOVoid](#schemaresponsedtovoid)|

<aside class="success">
This operation does not require authentication
</aside>

## update_2

<a id="opIdupdate_2"></a>

> Code samples

```shell
# You can also use wget
curl -X PUT http://localhost:9090/exercises/{id} \
  -H 'Content-Type: application/json' \
  -H 'Accept: */*'

```

```http
PUT http://localhost:9090/exercises/{id} HTTP/1.1
Host: localhost:9090
Content-Type: application/json
Accept: */*

```

```javascript
const inputBody = '{
  "name": "string",
  "category": "STRENGTH",
  "difficulty": "NOVICE",
  "muscle_ids": [
    0
  ]
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'*/*'
};

fetch('http://localhost:9090/exercises/{id}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => '*/*'
}

result = RestClient.put 'http://localhost:9090/exercises/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': '*/*'
}

r = requests.put('http://localhost:9090/exercises/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => '*/*',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','http://localhost:9090/exercises/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:9090/exercises/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"*/*"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "http://localhost:9090/exercises/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /exercises/{id}`

*Update an existing entity*

> Body parameter

```json
{
  "name": "string",
  "category": "STRENGTH",
  "difficulty": "NOVICE",
  "muscle_ids": [
    0
  ]
}
```

<h3 id="update_2-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer(int64)|true|none|
|lang|query|string|false|Language|
|body|body|[ExerciseWriteDTO](#schemaexercisewritedto)|true|none|

#### Enumerated Values

|Parameter|Value|
|---|---|
|lang|en_US|
|lang|pt_BR|

> Example responses

> 200 Response

<h3 id="update_2-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ResponseDTOExerciseReadDTO](#schemaresponsedtoexercisereaddto)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[ResponseDTOVoid](#schemaresponsedtovoid)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[ResponseDTOVoid](#schemaresponsedtovoid)|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|Conflict|[ResponseDTOVoid](#schemaresponsedtovoid)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[ResponseDTOVoid](#schemaresponsedtovoid)|

<aside class="success">
This operation does not require authentication
</aside>

## delete_2

<a id="opIddelete_2"></a>

> Code samples

```shell
# You can also use wget
curl -X DELETE http://localhost:9090/exercises/{id} \
  -H 'Accept: */*'

```

```http
DELETE http://localhost:9090/exercises/{id} HTTP/1.1
Host: localhost:9090
Accept: */*

```

```javascript

const headers = {
  'Accept':'*/*'
};

fetch('http://localhost:9090/exercises/{id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => '*/*'
}

result = RestClient.delete 'http://localhost:9090/exercises/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': '*/*'
}

r = requests.delete('http://localhost:9090/exercises/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => '*/*',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('DELETE','http://localhost:9090/exercises/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:9090/exercises/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"*/*"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "http://localhost:9090/exercises/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /exercises/{id}`

*Delete an entity by ID*

<h3 id="delete_2-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer(int64)|true|none|
|lang|query|string|false|Language|

#### Enumerated Values

|Parameter|Value|
|---|---|
|lang|en_US|
|lang|pt_BR|

> Example responses

> 200 Response

<h3 id="delete_2-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ResponseDTOExerciseReadDTO](#schemaresponsedtoexercisereaddto)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[ResponseDTOVoid](#schemaresponsedtovoid)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[ResponseDTOVoid](#schemaresponsedtovoid)|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|Conflict|[ResponseDTOVoid](#schemaresponsedtovoid)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[ResponseDTOVoid](#schemaresponsedtovoid)|

<aside class="success">
This operation does not require authentication
</aside>

## getAll_2

<a id="opIdgetAll_2"></a>

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:9090/exercises \
  -H 'Accept: */*'

```

```http
GET http://localhost:9090/exercises HTTP/1.1
Host: localhost:9090
Accept: */*

```

```javascript

const headers = {
  'Accept':'*/*'
};

fetch('http://localhost:9090/exercises',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => '*/*'
}

result = RestClient.get 'http://localhost:9090/exercises',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': '*/*'
}

r = requests.get('http://localhost:9090/exercises', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => '*/*',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:9090/exercises', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:9090/exercises");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"*/*"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:9090/exercises", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /exercises`

*Get all entities*

<h3 id="getall_2-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|lang|query|string|false|Language|

#### Enumerated Values

|Parameter|Value|
|---|---|
|lang|en_US|
|lang|pt_BR|

> Example responses

> 200 Response

<h3 id="getall_2-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ResponseDTOExerciseReadDTO](#schemaresponsedtoexercisereaddto)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[ResponseDTOVoid](#schemaresponsedtovoid)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[ResponseDTOVoid](#schemaresponsedtovoid)|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|Conflict|[ResponseDTOVoid](#schemaresponsedtovoid)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[ResponseDTOVoid](#schemaresponsedtovoid)|

<aside class="success">
This operation does not require authentication
</aside>

## create_2

<a id="opIdcreate_2"></a>

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:9090/exercises \
  -H 'Content-Type: application/json' \
  -H 'Accept: */*'

```

```http
POST http://localhost:9090/exercises HTTP/1.1
Host: localhost:9090
Content-Type: application/json
Accept: */*

```

```javascript
const inputBody = '{
  "name": "string",
  "category": "STRENGTH",
  "difficulty": "NOVICE",
  "muscle_ids": [
    0
  ]
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'*/*'
};

fetch('http://localhost:9090/exercises',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => '*/*'
}

result = RestClient.post 'http://localhost:9090/exercises',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': '*/*'
}

r = requests.post('http://localhost:9090/exercises', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => '*/*',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:9090/exercises', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:9090/exercises");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"*/*"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:9090/exercises", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /exercises`

*Create a new entity*

> Body parameter

```json
{
  "name": "string",
  "category": "STRENGTH",
  "difficulty": "NOVICE",
  "muscle_ids": [
    0
  ]
}
```

<h3 id="create_2-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|lang|query|string|false|Language|
|body|body|[ExerciseWriteDTO](#schemaexercisewritedto)|true|none|

#### Enumerated Values

|Parameter|Value|
|---|---|
|lang|en_US|
|lang|pt_BR|

> Example responses

> 200 Response

<h3 id="create_2-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ResponseDTOExerciseReadDTO](#schemaresponsedtoexercisereaddto)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[ResponseDTOVoid](#schemaresponsedtovoid)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[ResponseDTOVoid](#schemaresponsedtovoid)|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|Conflict|[ResponseDTOVoid](#schemaresponsedtovoid)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[ResponseDTOVoid](#schemaresponsedtovoid)|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="-mini-workout-logger-workout-exercise">Workout Exercise</h1>

Workout Exercise API

## listExercises

<a id="opIdlistExercises"></a>

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:9090/workouts/{id}/exercises \
  -H 'Accept: */*'

```

```http
GET http://localhost:9090/workouts/{id}/exercises HTTP/1.1
Host: localhost:9090
Accept: */*

```

```javascript

const headers = {
  'Accept':'*/*'
};

fetch('http://localhost:9090/workouts/{id}/exercises',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => '*/*'
}

result = RestClient.get 'http://localhost:9090/workouts/{id}/exercises',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': '*/*'
}

r = requests.get('http://localhost:9090/workouts/{id}/exercises', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => '*/*',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:9090/workouts/{id}/exercises', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:9090/workouts/{id}/exercises");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"*/*"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:9090/workouts/{id}/exercises", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /workouts/{id}/exercises`

<h3 id="listexercises-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer(int64)|true|none|
|lang|query|string|false|Language|

#### Enumerated Values

|Parameter|Value|
|---|---|
|lang|en_US|
|lang|pt_BR|

> Example responses

> 200 Response

<h3 id="listexercises-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ResponseDTOWorkoutExerciseReadDTO](#schemaresponsedtoworkoutexercisereaddto)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[ResponseDTOVoid](#schemaresponsedtovoid)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[ResponseDTOVoid](#schemaresponsedtovoid)|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|Conflict|[ResponseDTOVoid](#schemaresponsedtovoid)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[ResponseDTOVoid](#schemaresponsedtovoid)|

<aside class="success">
This operation does not require authentication
</aside>

## addExercise

<a id="opIdaddExercise"></a>

> Code samples

```shell
# You can also use wget
curl -X PUT http://localhost:9090/workouts/{id}/exercises \
  -H 'Content-Type: application/json' \
  -H 'Accept: */*'

```

```http
PUT http://localhost:9090/workouts/{id}/exercises HTTP/1.1
Host: localhost:9090
Content-Type: application/json
Accept: */*

```

```javascript
const inputBody = '{
  "sets": [
    {
      "category": "NORMAL",
      "type": "REPS",
      "repetitions": 0,
      "weight": 0.1,
      "duration_seconds": 0
    }
  ],
  "equipment": "BARBELL",
  "exercise_id": 0,
  "rest_time_seconds": 0
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'*/*'
};

fetch('http://localhost:9090/workouts/{id}/exercises',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => '*/*'
}

result = RestClient.put 'http://localhost:9090/workouts/{id}/exercises',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': '*/*'
}

r = requests.put('http://localhost:9090/workouts/{id}/exercises', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => '*/*',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','http://localhost:9090/workouts/{id}/exercises', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:9090/workouts/{id}/exercises");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"*/*"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "http://localhost:9090/workouts/{id}/exercises", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /workouts/{id}/exercises`

> Body parameter

```json
{
  "sets": [
    {
      "category": "NORMAL",
      "type": "REPS",
      "repetitions": 0,
      "weight": 0.1,
      "duration_seconds": 0
    }
  ],
  "equipment": "BARBELL",
  "exercise_id": 0,
  "rest_time_seconds": 0
}
```

<h3 id="addexercise-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer(int64)|true|none|
|lang|query|string|false|Language|
|body|body|[WorkoutExerciseWriteDTO](#schemaworkoutexercisewritedto)|true|none|

#### Enumerated Values

|Parameter|Value|
|---|---|
|lang|en_US|
|lang|pt_BR|

> Example responses

> 200 Response

<h3 id="addexercise-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ResponseDTOWorkoutExerciseReadDTO](#schemaresponsedtoworkoutexercisereaddto)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[ResponseDTOVoid](#schemaresponsedtovoid)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[ResponseDTOVoid](#schemaresponsedtovoid)|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|Conflict|[ResponseDTOVoid](#schemaresponsedtovoid)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[ResponseDTOVoid](#schemaresponsedtovoid)|

<aside class="success">
This operation does not require authentication
</aside>

## reorderExercise

<a id="opIdreorderExercise"></a>

> Code samples

```shell
# You can also use wget
curl -X PUT http://localhost:9090/workouts/{id}/exercises/reorder/{exerciseId}?newPosition=0 \
  -H 'Accept: */*'

```

```http
PUT http://localhost:9090/workouts/{id}/exercises/reorder/{exerciseId}?newPosition=0 HTTP/1.1
Host: localhost:9090
Accept: */*

```

```javascript

const headers = {
  'Accept':'*/*'
};

fetch('http://localhost:9090/workouts/{id}/exercises/reorder/{exerciseId}?newPosition=0',
{
  method: 'PUT',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => '*/*'
}

result = RestClient.put 'http://localhost:9090/workouts/{id}/exercises/reorder/{exerciseId}',
  params: {
  'newPosition' => 'integer(int32)'
}, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': '*/*'
}

r = requests.put('http://localhost:9090/workouts/{id}/exercises/reorder/{exerciseId}', params={
  'newPosition': '0'
}, headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => '*/*',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','http://localhost:9090/workouts/{id}/exercises/reorder/{exerciseId}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:9090/workouts/{id}/exercises/reorder/{exerciseId}?newPosition=0");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"*/*"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "http://localhost:9090/workouts/{id}/exercises/reorder/{exerciseId}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /workouts/{id}/exercises/reorder/{exerciseId}`

<h3 id="reorderexercise-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer(int64)|true|none|
|exerciseId|path|integer(int64)|true|none|
|newPosition|query|integer(int32)|true|none|
|lang|query|string|false|Language|

#### Enumerated Values

|Parameter|Value|
|---|---|
|lang|en_US|
|lang|pt_BR|

> Example responses

> 200 Response

<h3 id="reorderexercise-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ResponseDTOWorkoutExerciseReadDTO](#schemaresponsedtoworkoutexercisereaddto)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[ResponseDTOVoid](#schemaresponsedtovoid)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[ResponseDTOVoid](#schemaresponsedtovoid)|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|Conflict|[ResponseDTOVoid](#schemaresponsedtovoid)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[ResponseDTOVoid](#schemaresponsedtovoid)|

<aside class="success">
This operation does not require authentication
</aside>

## removeExercise

<a id="opIdremoveExercise"></a>

> Code samples

```shell
# You can also use wget
curl -X PUT http://localhost:9090/workouts/{id}/exercises/remove/{exerciseId} \
  -H 'Accept: */*'

```

```http
PUT http://localhost:9090/workouts/{id}/exercises/remove/{exerciseId} HTTP/1.1
Host: localhost:9090
Accept: */*

```

```javascript

const headers = {
  'Accept':'*/*'
};

fetch('http://localhost:9090/workouts/{id}/exercises/remove/{exerciseId}',
{
  method: 'PUT',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => '*/*'
}

result = RestClient.put 'http://localhost:9090/workouts/{id}/exercises/remove/{exerciseId}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': '*/*'
}

r = requests.put('http://localhost:9090/workouts/{id}/exercises/remove/{exerciseId}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => '*/*',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','http://localhost:9090/workouts/{id}/exercises/remove/{exerciseId}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:9090/workouts/{id}/exercises/remove/{exerciseId}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"*/*"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "http://localhost:9090/workouts/{id}/exercises/remove/{exerciseId}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /workouts/{id}/exercises/remove/{exerciseId}`

<h3 id="removeexercise-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer(int64)|true|none|
|exerciseId|path|integer(int64)|true|none|
|lang|query|string|false|Language|

#### Enumerated Values

|Parameter|Value|
|---|---|
|lang|en_US|
|lang|pt_BR|

> Example responses

> 200 Response

<h3 id="removeexercise-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ResponseDTOWorkoutExerciseReadDTO](#schemaresponsedtoworkoutexercisereaddto)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[ResponseDTOVoid](#schemaresponsedtovoid)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[ResponseDTOVoid](#schemaresponsedtovoid)|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|Conflict|[ResponseDTOVoid](#schemaresponsedtovoid)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[ResponseDTOVoid](#schemaresponsedtovoid)|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="-mini-workout-logger-workout">Workout</h1>

Workout API

## getById

<a id="opIdgetById"></a>

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:9090/workouts/{id} \
  -H 'Accept: */*'

```

```http
GET http://localhost:9090/workouts/{id} HTTP/1.1
Host: localhost:9090
Accept: */*

```

```javascript

const headers = {
  'Accept':'*/*'
};

fetch('http://localhost:9090/workouts/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => '*/*'
}

result = RestClient.get 'http://localhost:9090/workouts/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': '*/*'
}

r = requests.get('http://localhost:9090/workouts/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => '*/*',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:9090/workouts/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:9090/workouts/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"*/*"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:9090/workouts/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /workouts/{id}`

*Get entity by ID*

<h3 id="getbyid-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer(int64)|true|none|
|lang|query|string|false|Language|

#### Enumerated Values

|Parameter|Value|
|---|---|
|lang|en_US|
|lang|pt_BR|

> Example responses

> 200 Response

<h3 id="getbyid-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ResponseDTOWorkoutReadDTO](#schemaresponsedtoworkoutreaddto)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[ResponseDTOVoid](#schemaresponsedtovoid)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[ResponseDTOVoid](#schemaresponsedtovoid)|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|Conflict|[ResponseDTOVoid](#schemaresponsedtovoid)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[ResponseDTOVoid](#schemaresponsedtovoid)|

<aside class="success">
This operation does not require authentication
</aside>

## update

<a id="opIdupdate"></a>

> Code samples

```shell
# You can also use wget
curl -X PUT http://localhost:9090/workouts/{id} \
  -H 'Content-Type: application/json' \
  -H 'Accept: */*'

```

```http
PUT http://localhost:9090/workouts/{id} HTTP/1.1
Host: localhost:9090
Content-Type: application/json
Accept: */*

```

```javascript
const inputBody = '{
  "name": "string",
  "workout_exercises": [
    {
      "sets": [
        {
          "category": "NORMAL",
          "type": "REPS",
          "repetitions": 0,
          "weight": 0.1,
          "duration_seconds": 0
        }
      ],
      "equipment": "BARBELL",
      "exercise_id": 0,
      "rest_time_seconds": 0
    }
  ]
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'*/*'
};

fetch('http://localhost:9090/workouts/{id}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => '*/*'
}

result = RestClient.put 'http://localhost:9090/workouts/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': '*/*'
}

r = requests.put('http://localhost:9090/workouts/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => '*/*',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','http://localhost:9090/workouts/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:9090/workouts/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"*/*"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "http://localhost:9090/workouts/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /workouts/{id}`

*Update an existing entity*

> Body parameter

```json
{
  "name": "string",
  "workout_exercises": [
    {
      "sets": [
        {
          "category": "NORMAL",
          "type": "REPS",
          "repetitions": 0,
          "weight": 0.1,
          "duration_seconds": 0
        }
      ],
      "equipment": "BARBELL",
      "exercise_id": 0,
      "rest_time_seconds": 0
    }
  ]
}
```

<h3 id="update-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer(int64)|true|none|
|lang|query|string|false|Language|
|body|body|[WorkoutWriteDTO](#schemaworkoutwritedto)|true|none|

#### Enumerated Values

|Parameter|Value|
|---|---|
|lang|en_US|
|lang|pt_BR|

> Example responses

> 200 Response

<h3 id="update-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ResponseDTOWorkoutReadDTO](#schemaresponsedtoworkoutreaddto)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[ResponseDTOVoid](#schemaresponsedtovoid)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[ResponseDTOVoid](#schemaresponsedtovoid)|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|Conflict|[ResponseDTOVoid](#schemaresponsedtovoid)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[ResponseDTOVoid](#schemaresponsedtovoid)|

<aside class="success">
This operation does not require authentication
</aside>

## delete

<a id="opIddelete"></a>

> Code samples

```shell
# You can also use wget
curl -X DELETE http://localhost:9090/workouts/{id} \
  -H 'Accept: */*'

```

```http
DELETE http://localhost:9090/workouts/{id} HTTP/1.1
Host: localhost:9090
Accept: */*

```

```javascript

const headers = {
  'Accept':'*/*'
};

fetch('http://localhost:9090/workouts/{id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => '*/*'
}

result = RestClient.delete 'http://localhost:9090/workouts/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': '*/*'
}

r = requests.delete('http://localhost:9090/workouts/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => '*/*',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('DELETE','http://localhost:9090/workouts/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:9090/workouts/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"*/*"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "http://localhost:9090/workouts/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /workouts/{id}`

*Delete an entity by ID*

<h3 id="delete-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer(int64)|true|none|
|lang|query|string|false|Language|

#### Enumerated Values

|Parameter|Value|
|---|---|
|lang|en_US|
|lang|pt_BR|

> Example responses

> 200 Response

<h3 id="delete-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ResponseDTOWorkoutReadDTO](#schemaresponsedtoworkoutreaddto)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[ResponseDTOVoid](#schemaresponsedtovoid)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[ResponseDTOVoid](#schemaresponsedtovoid)|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|Conflict|[ResponseDTOVoid](#schemaresponsedtovoid)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[ResponseDTOVoid](#schemaresponsedtovoid)|

<aside class="success">
This operation does not require authentication
</aside>

## getAll

<a id="opIdgetAll"></a>

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:9090/workouts \
  -H 'Accept: */*'

```

```http
GET http://localhost:9090/workouts HTTP/1.1
Host: localhost:9090
Accept: */*

```

```javascript

const headers = {
  'Accept':'*/*'
};

fetch('http://localhost:9090/workouts',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => '*/*'
}

result = RestClient.get 'http://localhost:9090/workouts',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': '*/*'
}

r = requests.get('http://localhost:9090/workouts', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => '*/*',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:9090/workouts', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:9090/workouts");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"*/*"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:9090/workouts", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /workouts`

*Get all entities*

<h3 id="getall-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|lang|query|string|false|Language|

#### Enumerated Values

|Parameter|Value|
|---|---|
|lang|en_US|
|lang|pt_BR|

> Example responses

> 200 Response

<h3 id="getall-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ResponseDTOWorkoutReadDTO](#schemaresponsedtoworkoutreaddto)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[ResponseDTOVoid](#schemaresponsedtovoid)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[ResponseDTOVoid](#schemaresponsedtovoid)|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|Conflict|[ResponseDTOVoid](#schemaresponsedtovoid)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[ResponseDTOVoid](#schemaresponsedtovoid)|

<aside class="success">
This operation does not require authentication
</aside>

## create

<a id="opIdcreate"></a>

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:9090/workouts \
  -H 'Content-Type: application/json' \
  -H 'Accept: */*'

```

```http
POST http://localhost:9090/workouts HTTP/1.1
Host: localhost:9090
Content-Type: application/json
Accept: */*

```

```javascript
const inputBody = '{
  "name": "string",
  "workout_exercises": [
    {
      "sets": [
        {
          "category": "NORMAL",
          "type": "REPS",
          "repetitions": 0,
          "weight": 0.1,
          "duration_seconds": 0
        }
      ],
      "equipment": "BARBELL",
      "exercise_id": 0,
      "rest_time_seconds": 0
    }
  ]
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'*/*'
};

fetch('http://localhost:9090/workouts',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => '*/*'
}

result = RestClient.post 'http://localhost:9090/workouts',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': '*/*'
}

r = requests.post('http://localhost:9090/workouts', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => '*/*',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:9090/workouts', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:9090/workouts");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"*/*"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:9090/workouts", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /workouts`

*Create a new entity*

> Body parameter

```json
{
  "name": "string",
  "workout_exercises": [
    {
      "sets": [
        {
          "category": "NORMAL",
          "type": "REPS",
          "repetitions": 0,
          "weight": 0.1,
          "duration_seconds": 0
        }
      ],
      "equipment": "BARBELL",
      "exercise_id": 0,
      "rest_time_seconds": 0
    }
  ]
}
```

<h3 id="create-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|lang|query|string|false|Language|
|body|body|[WorkoutWriteDTO](#schemaworkoutwritedto)|true|none|

#### Enumerated Values

|Parameter|Value|
|---|---|
|lang|en_US|
|lang|pt_BR|

> Example responses

> 200 Response

<h3 id="create-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ResponseDTOWorkoutReadDTO](#schemaresponsedtoworkoutreaddto)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[ResponseDTOVoid](#schemaresponsedtovoid)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[ResponseDTOVoid](#schemaresponsedtovoid)|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|Conflict|[ResponseDTOVoid](#schemaresponsedtovoid)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[ResponseDTOVoid](#schemaresponsedtovoid)|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="-mini-workout-logger-workout-execution">Workout Execution</h1>

Workout Execution API

## getAllWorkoutExecutions

<a id="opIdgetAllWorkoutExecutions"></a>

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:9090/workouts/{id}/executions \
  -H 'Accept: */*'

```

```http
GET http://localhost:9090/workouts/{id}/executions HTTP/1.1
Host: localhost:9090
Accept: */*

```

```javascript

const headers = {
  'Accept':'*/*'
};

fetch('http://localhost:9090/workouts/{id}/executions',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => '*/*'
}

result = RestClient.get 'http://localhost:9090/workouts/{id}/executions',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': '*/*'
}

r = requests.get('http://localhost:9090/workouts/{id}/executions', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => '*/*',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:9090/workouts/{id}/executions', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:9090/workouts/{id}/executions");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"*/*"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:9090/workouts/{id}/executions", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /workouts/{id}/executions`

<h3 id="getallworkoutexecutions-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer(int64)|true|none|
|lang|query|string|false|Language|

#### Enumerated Values

|Parameter|Value|
|---|---|
|lang|en_US|
|lang|pt_BR|

> Example responses

> 200 Response

<h3 id="getallworkoutexecutions-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ResponseDTOWorkoutExecutionReadDTO](#schemaresponsedtoworkoutexecutionreaddto)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[ResponseDTOVoid](#schemaresponsedtovoid)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[ResponseDTOVoid](#schemaresponsedtovoid)|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|Conflict|[ResponseDTOVoid](#schemaresponsedtovoid)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[ResponseDTOVoid](#schemaresponsedtovoid)|

<aside class="success">
This operation does not require authentication
</aside>

## createWorkoutExecution

<a id="opIdcreateWorkoutExecution"></a>

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:9090/workouts/{id}/executions \
  -H 'Content-Type: application/json' \
  -H 'Accept: */*'

```

```http
POST http://localhost:9090/workouts/{id}/executions HTTP/1.1
Host: localhost:9090
Content-Type: application/json
Accept: */*

```

```javascript
const inputBody = '{
  "executions": [
    {
      "set_executions": [
        {
          "completed": true,
          "set_id": 0,
          "actual_repetitions": 0,
          "actual_weight": 0.1,
          "actual_duration_seconds": 0
        }
      ]
    }
  ]
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'*/*'
};

fetch('http://localhost:9090/workouts/{id}/executions',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => '*/*'
}

result = RestClient.post 'http://localhost:9090/workouts/{id}/executions',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': '*/*'
}

r = requests.post('http://localhost:9090/workouts/{id}/executions', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => '*/*',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:9090/workouts/{id}/executions', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:9090/workouts/{id}/executions");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"*/*"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:9090/workouts/{id}/executions", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /workouts/{id}/executions`

> Body parameter

```json
{
  "executions": [
    {
      "set_executions": [
        {
          "completed": true,
          "set_id": 0,
          "actual_repetitions": 0,
          "actual_weight": 0.1,
          "actual_duration_seconds": 0
        }
      ]
    }
  ]
}
```

<h3 id="createworkoutexecution-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer(int64)|true|none|
|lang|query|string|false|Language|
|body|body|[WorkoutExecutionWriteDTO](#schemaworkoutexecutionwritedto)|true|none|

#### Enumerated Values

|Parameter|Value|
|---|---|
|lang|en_US|
|lang|pt_BR|

> Example responses

> 200 Response

<h3 id="createworkoutexecution-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ResponseDTOWorkoutExecutionReadDTO](#schemaresponsedtoworkoutexecutionreaddto)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[ResponseDTOVoid](#schemaresponsedtovoid)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[ResponseDTOVoid](#schemaresponsedtovoid)|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|Conflict|[ResponseDTOVoid](#schemaresponsedtovoid)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[ResponseDTOVoid](#schemaresponsedtovoid)|

<aside class="success">
This operation does not require authentication
</aside>

## removeWorkoutExecution

<a id="opIdremoveWorkoutExecution"></a>

> Code samples

```shell
# You can also use wget
curl -X DELETE http://localhost:9090/workouts/{id}/executions/{workoutExecutionId} \
  -H 'Accept: */*'

```

```http
DELETE http://localhost:9090/workouts/{id}/executions/{workoutExecutionId} HTTP/1.1
Host: localhost:9090
Accept: */*

```

```javascript

const headers = {
  'Accept':'*/*'
};

fetch('http://localhost:9090/workouts/{id}/executions/{workoutExecutionId}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => '*/*'
}

result = RestClient.delete 'http://localhost:9090/workouts/{id}/executions/{workoutExecutionId}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': '*/*'
}

r = requests.delete('http://localhost:9090/workouts/{id}/executions/{workoutExecutionId}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => '*/*',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('DELETE','http://localhost:9090/workouts/{id}/executions/{workoutExecutionId}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:9090/workouts/{id}/executions/{workoutExecutionId}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"*/*"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "http://localhost:9090/workouts/{id}/executions/{workoutExecutionId}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /workouts/{id}/executions/{workoutExecutionId}`

<h3 id="removeworkoutexecution-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer(int64)|true|none|
|workoutExecutionId|path|integer(int64)|true|none|
|lang|query|string|false|Language|

#### Enumerated Values

|Parameter|Value|
|---|---|
|lang|en_US|
|lang|pt_BR|

> Example responses

> 200 Response

<h3 id="removeworkoutexecution-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ResponseDTOVoid](#schemaresponsedtovoid)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[ResponseDTOVoid](#schemaresponsedtovoid)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[ResponseDTOVoid](#schemaresponsedtovoid)|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|Conflict|[ResponseDTOVoid](#schemaresponsedtovoid)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[ResponseDTOVoid](#schemaresponsedtovoid)|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="-mini-workout-logger-greeting-controller">greeting-controller</h1>

## getGreeting

<a id="opIdgetGreeting"></a>

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:9090/greeting \
  -H 'Accept: */*'

```

```http
GET http://localhost:9090/greeting HTTP/1.1
Host: localhost:9090
Accept: */*

```

```javascript

const headers = {
  'Accept':'*/*'
};

fetch('http://localhost:9090/greeting',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => '*/*'
}

result = RestClient.get 'http://localhost:9090/greeting',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': '*/*'
}

r = requests.get('http://localhost:9090/greeting', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => '*/*',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:9090/greeting', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:9090/greeting");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"*/*"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:9090/greeting", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /greeting`

<h3 id="getgreeting-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|lang|query|string|false|Language|

#### Enumerated Values

|Parameter|Value|
|---|---|
|lang|en_US|
|lang|pt_BR|

> Example responses

> 200 Response

<h3 id="getgreeting-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|string|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[ResponseDTOVoid](#schemaresponsedtovoid)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[ResponseDTOVoid](#schemaresponsedtovoid)|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|Conflict|[ResponseDTOVoid](#schemaresponsedtovoid)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[ResponseDTOVoid](#schemaresponsedtovoid)|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_ResponseDTOVoid">ResponseDTOVoid</h2>
<!-- backwards compatibility -->
<a id="schemaresponsedtovoid"></a>
<a id="schema_ResponseDTOVoid"></a>
<a id="tocSresponsedtovoid"></a>
<a id="tocsresponsedtovoid"></a>

```json
{
  "status": 0,
  "message": "string",
  "data": [
    {}
  ],
  "errors": [
    "string"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|status|integer(int32)|false|none|none|
|message|string|false|none|none|
|data|[object]|false|none|none|
|errors|[string]|false|none|none|

<h2 id="tocS_SetWriteDTO">SetWriteDTO</h2>
<!-- backwards compatibility -->
<a id="schemasetwritedto"></a>
<a id="schema_SetWriteDTO"></a>
<a id="tocSsetwritedto"></a>
<a id="tocssetwritedto"></a>

```json
{
  "category": "NORMAL",
  "type": "REPS",
  "repetitions": 0,
  "weight": 0.1,
  "duration_seconds": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|category|string|false|none|none|
|type|string|false|none|none|
|repetitions|integer(int32)|false|none|none|
|weight|number(double)|false|none|none|
|duration_seconds|integer(int32)|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|category|NORMAL|
|category|WARMUP|
|category|COMPOUND|
|type|REPS|
|type|REPS_X_WEIGHT|
|type|TIME_X_WEIGHT|
|type|TIME|

<h2 id="tocS_WorkoutExerciseWriteDTO">WorkoutExerciseWriteDTO</h2>
<!-- backwards compatibility -->
<a id="schemaworkoutexercisewritedto"></a>
<a id="schema_WorkoutExerciseWriteDTO"></a>
<a id="tocSworkoutexercisewritedto"></a>
<a id="tocsworkoutexercisewritedto"></a>

```json
{
  "sets": [
    {
      "category": "NORMAL",
      "type": "REPS",
      "repetitions": 0,
      "weight": 0.1,
      "duration_seconds": 0
    }
  ],
  "equipment": "BARBELL",
  "exercise_id": 0,
  "rest_time_seconds": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|sets|[[SetWriteDTO](#schemasetwritedto)]|false|none|none|
|equipment|string|false|none|none|
|exercise_id|integer(int64)|true|none|none|
|rest_time_seconds|integer(int32)|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|equipment|BARBELL|
|equipment|DUMBBELL|
|equipment|BODYWEIGHT|
|equipment|BOSU_BALL|
|equipment|CABLE|
|equipment|EXERCISE_BALL|
|equipment|MACHINE|
|equipment|SMITH_MACHINE|
|equipment|MEDICINE_BALL|
|equipment|PLATE|
|equipment|RESISTANCE_BAND|
|equipment|TRX|
|equipment|KETTLEBELL|

<h2 id="tocS_WorkoutWriteDTO">WorkoutWriteDTO</h2>
<!-- backwards compatibility -->
<a id="schemaworkoutwritedto"></a>
<a id="schema_WorkoutWriteDTO"></a>
<a id="tocSworkoutwritedto"></a>
<a id="tocsworkoutwritedto"></a>

```json
{
  "name": "string",
  "workout_exercises": [
    {
      "sets": [
        {
          "category": "NORMAL",
          "type": "REPS",
          "repetitions": 0,
          "weight": 0.1,
          "duration_seconds": 0
        }
      ],
      "equipment": "BARBELL",
      "exercise_id": 0,
      "rest_time_seconds": 0
    }
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|none|
|workout_exercises|[[WorkoutExerciseWriteDTO](#schemaworkoutexercisewritedto)]|true|none|none|

<h2 id="tocS_ExerciseReadDTO">ExerciseReadDTO</h2>
<!-- backwards compatibility -->
<a id="schemaexercisereaddto"></a>
<a id="schema_ExerciseReadDTO"></a>
<a id="tocSexercisereaddto"></a>
<a id="tocsexercisereaddto"></a>

```json
{
  "id": 0,
  "name": "string",
  "category": "STRENGTH",
  "difficulty": "NOVICE",
  "muscles": [
    {
      "id": 0,
      "name": "string",
      "muscle_groups": [
        {}
      ]
    }
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer(int64)|false|none|none|
|name|string|false|none|none|
|category|string|false|none|none|
|difficulty|string|false|none|none|
|muscles|[[MuscleReadDTO](#schemamusclereaddto)]|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|category|STRENGTH|
|category|CARDIO|
|category|STRETCHING|
|category|POWERLIFTING|
|category|OLYMPIC_WEIGHTLIFTING|
|category|STRONGMAN|
|category|CALISTHENICS|
|category|PLYOMETRICS|
|category|RECOVERY|
|category|HIT|
|category|MOBILITY|
|category|PILATES|
|category|YOGA|
|category|WARM_UP|
|difficulty|NOVICE|
|difficulty|BEGINNER|
|difficulty|INTERMEDIATE|
|difficulty|ADVANCED|

<h2 id="tocS_MuscleReadDTO">MuscleReadDTO</h2>
<!-- backwards compatibility -->
<a id="schemamusclereaddto"></a>
<a id="schema_MuscleReadDTO"></a>
<a id="tocSmusclereaddto"></a>
<a id="tocsmusclereaddto"></a>

```json
{
  "id": 0,
  "name": "string",
  "muscle_groups": [
    {
      "id": 0,
      "name": "string",
      "muscle_groups": []
    }
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer(int64)|false|none|none|
|name|string|false|none|none|
|muscle_groups|[[MuscleReadDTO](#schemamusclereaddto)]|false|none|none|

<h2 id="tocS_ResponseDTOWorkoutReadDTO">ResponseDTOWorkoutReadDTO</h2>
<!-- backwards compatibility -->
<a id="schemaresponsedtoworkoutreaddto"></a>
<a id="schema_ResponseDTOWorkoutReadDTO"></a>
<a id="tocSresponsedtoworkoutreaddto"></a>
<a id="tocsresponsedtoworkoutreaddto"></a>

```json
{
  "status": 0,
  "message": "string",
  "data": [
    {
      "id": 0,
      "name": "string",
      "workout_exercises": [
        {
          "id": 0,
          "position": 0,
          "exercise": {
            "id": 0,
            "name": "string",
            "category": "STRENGTH",
            "difficulty": "NOVICE",
            "muscles": [
              {
                "id": 0,
                "name": "string",
                "muscle_groups": [
                  {}
                ]
              }
            ]
          },
          "sets": [
            {
              "id": 0,
              "position": 0,
              "category": "NORMAL",
              "type": "REPS",
              "repetitions": 0,
              "weight": 0.1,
              "duration_seconds": 0
            }
          ],
          "equipment": "BARBELL",
          "rest_time_seconds": 0
        }
      ]
    }
  ],
  "errors": [
    "string"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|status|integer(int32)|false|none|none|
|message|string|false|none|none|
|data|[[WorkoutReadDTO](#schemaworkoutreaddto)]|false|none|none|
|errors|[string]|false|none|none|

<h2 id="tocS_SetReadDTO">SetReadDTO</h2>
<!-- backwards compatibility -->
<a id="schemasetreaddto"></a>
<a id="schema_SetReadDTO"></a>
<a id="tocSsetreaddto"></a>
<a id="tocssetreaddto"></a>

```json
{
  "id": 0,
  "position": 0,
  "category": "NORMAL",
  "type": "REPS",
  "repetitions": 0,
  "weight": 0.1,
  "duration_seconds": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer(int64)|false|none|none|
|position|integer(int32)|false|none|none|
|category|string|false|none|none|
|type|string|false|none|none|
|repetitions|integer(int32)|false|none|none|
|weight|number(double)|false|none|none|
|duration_seconds|integer(int32)|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|category|NORMAL|
|category|WARMUP|
|category|COMPOUND|
|type|REPS|
|type|REPS_X_WEIGHT|
|type|TIME_X_WEIGHT|
|type|TIME|

<h2 id="tocS_WorkoutExerciseReadDTO">WorkoutExerciseReadDTO</h2>
<!-- backwards compatibility -->
<a id="schemaworkoutexercisereaddto"></a>
<a id="schema_WorkoutExerciseReadDTO"></a>
<a id="tocSworkoutexercisereaddto"></a>
<a id="tocsworkoutexercisereaddto"></a>

```json
{
  "id": 0,
  "position": 0,
  "exercise": {
    "id": 0,
    "name": "string",
    "category": "STRENGTH",
    "difficulty": "NOVICE",
    "muscles": [
      {
        "id": 0,
        "name": "string",
        "muscle_groups": [
          {}
        ]
      }
    ]
  },
  "sets": [
    {
      "id": 0,
      "position": 0,
      "category": "NORMAL",
      "type": "REPS",
      "repetitions": 0,
      "weight": 0.1,
      "duration_seconds": 0
    }
  ],
  "equipment": "BARBELL",
  "rest_time_seconds": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer(int64)|false|none|none|
|position|integer(int32)|false|none|none|
|exercise|[ExerciseReadDTO](#schemaexercisereaddto)|false|none|none|
|sets|[[SetReadDTO](#schemasetreaddto)]|false|none|none|
|equipment|string|false|none|none|
|rest_time_seconds|integer(int32)|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|equipment|BARBELL|
|equipment|DUMBBELL|
|equipment|BODYWEIGHT|
|equipment|BOSU_BALL|
|equipment|CABLE|
|equipment|EXERCISE_BALL|
|equipment|MACHINE|
|equipment|SMITH_MACHINE|
|equipment|MEDICINE_BALL|
|equipment|PLATE|
|equipment|RESISTANCE_BAND|
|equipment|TRX|
|equipment|KETTLEBELL|

<h2 id="tocS_WorkoutReadDTO">WorkoutReadDTO</h2>
<!-- backwards compatibility -->
<a id="schemaworkoutreaddto"></a>
<a id="schema_WorkoutReadDTO"></a>
<a id="tocSworkoutreaddto"></a>
<a id="tocsworkoutreaddto"></a>

```json
{
  "id": 0,
  "name": "string",
  "workout_exercises": [
    {
      "id": 0,
      "position": 0,
      "exercise": {
        "id": 0,
        "name": "string",
        "category": "STRENGTH",
        "difficulty": "NOVICE",
        "muscles": [
          {
            "id": 0,
            "name": "string",
            "muscle_groups": [
              {}
            ]
          }
        ]
      },
      "sets": [
        {
          "id": 0,
          "position": 0,
          "category": "NORMAL",
          "type": "REPS",
          "repetitions": 0,
          "weight": 0.1,
          "duration_seconds": 0
        }
      ],
      "equipment": "BARBELL",
      "rest_time_seconds": 0
    }
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer(int64)|false|none|none|
|name|string|false|none|none|
|workout_exercises|[[WorkoutExerciseReadDTO](#schemaworkoutexercisereaddto)]|false|none|none|

<h2 id="tocS_ResponseDTOWorkoutExerciseReadDTO">ResponseDTOWorkoutExerciseReadDTO</h2>
<!-- backwards compatibility -->
<a id="schemaresponsedtoworkoutexercisereaddto"></a>
<a id="schema_ResponseDTOWorkoutExerciseReadDTO"></a>
<a id="tocSresponsedtoworkoutexercisereaddto"></a>
<a id="tocsresponsedtoworkoutexercisereaddto"></a>

```json
{
  "status": 0,
  "message": "string",
  "data": [
    {
      "id": 0,
      "position": 0,
      "exercise": {
        "id": 0,
        "name": "string",
        "category": "STRENGTH",
        "difficulty": "NOVICE",
        "muscles": [
          {
            "id": 0,
            "name": "string",
            "muscle_groups": [
              {}
            ]
          }
        ]
      },
      "sets": [
        {
          "id": 0,
          "position": 0,
          "category": "NORMAL",
          "type": "REPS",
          "repetitions": 0,
          "weight": 0.1,
          "duration_seconds": 0
        }
      ],
      "equipment": "BARBELL",
      "rest_time_seconds": 0
    }
  ],
  "errors": [
    "string"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|status|integer(int32)|false|none|none|
|message|string|false|none|none|
|data|[[WorkoutExerciseReadDTO](#schemaworkoutexercisereaddto)]|false|none|none|
|errors|[string]|false|none|none|

<h2 id="tocS_ResponseDTOSetReadDTO">ResponseDTOSetReadDTO</h2>
<!-- backwards compatibility -->
<a id="schemaresponsedtosetreaddto"></a>
<a id="schema_ResponseDTOSetReadDTO"></a>
<a id="tocSresponsedtosetreaddto"></a>
<a id="tocsresponsedtosetreaddto"></a>

```json
{
  "status": 0,
  "message": "string",
  "data": [
    {
      "id": 0,
      "position": 0,
      "category": "NORMAL",
      "type": "REPS",
      "repetitions": 0,
      "weight": 0.1,
      "duration_seconds": 0
    }
  ],
  "errors": [
    "string"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|status|integer(int32)|false|none|none|
|message|string|false|none|none|
|data|[[SetReadDTO](#schemasetreaddto)]|false|none|none|
|errors|[string]|false|none|none|

<h2 id="tocS_MuscleWriteDTO">MuscleWriteDTO</h2>
<!-- backwards compatibility -->
<a id="schemamusclewritedto"></a>
<a id="schema_MuscleWriteDTO"></a>
<a id="tocSmusclewritedto"></a>
<a id="tocsmusclewritedto"></a>

```json
{
  "name": "string",
  "muscle_group_ids": [
    0
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|none|
|muscle_group_ids|[integer]|false|none|none|

<h2 id="tocS_ResponseDTOMuscleReadDTO">ResponseDTOMuscleReadDTO</h2>
<!-- backwards compatibility -->
<a id="schemaresponsedtomusclereaddto"></a>
<a id="schema_ResponseDTOMuscleReadDTO"></a>
<a id="tocSresponsedtomusclereaddto"></a>
<a id="tocsresponsedtomusclereaddto"></a>

```json
{
  "status": 0,
  "message": "string",
  "data": [
    {
      "id": 0,
      "name": "string",
      "muscle_groups": [
        {}
      ]
    }
  ],
  "errors": [
    "string"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|status|integer(int32)|false|none|none|
|message|string|false|none|none|
|data|[[MuscleReadDTO](#schemamusclereaddto)]|false|none|none|
|errors|[string]|false|none|none|

<h2 id="tocS_ExerciseWriteDTO">ExerciseWriteDTO</h2>
<!-- backwards compatibility -->
<a id="schemaexercisewritedto"></a>
<a id="schema_ExerciseWriteDTO"></a>
<a id="tocSexercisewritedto"></a>
<a id="tocsexercisewritedto"></a>

```json
{
  "name": "string",
  "category": "STRENGTH",
  "difficulty": "NOVICE",
  "muscle_ids": [
    0
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|none|
|category|string|false|none|none|
|difficulty|string|false|none|none|
|muscle_ids|[integer]|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|category|STRENGTH|
|category|CARDIO|
|category|STRETCHING|
|category|POWERLIFTING|
|category|OLYMPIC_WEIGHTLIFTING|
|category|STRONGMAN|
|category|CALISTHENICS|
|category|PLYOMETRICS|
|category|RECOVERY|
|category|HIT|
|category|MOBILITY|
|category|PILATES|
|category|YOGA|
|category|WARM_UP|
|difficulty|NOVICE|
|difficulty|BEGINNER|
|difficulty|INTERMEDIATE|
|difficulty|ADVANCED|

<h2 id="tocS_ResponseDTOExerciseReadDTO">ResponseDTOExerciseReadDTO</h2>
<!-- backwards compatibility -->
<a id="schemaresponsedtoexercisereaddto"></a>
<a id="schema_ResponseDTOExerciseReadDTO"></a>
<a id="tocSresponsedtoexercisereaddto"></a>
<a id="tocsresponsedtoexercisereaddto"></a>

```json
{
  "status": 0,
  "message": "string",
  "data": [
    {
      "id": 0,
      "name": "string",
      "category": "STRENGTH",
      "difficulty": "NOVICE",
      "muscles": [
        {
          "id": 0,
          "name": "string",
          "muscle_groups": [
            {}
          ]
        }
      ]
    }
  ],
  "errors": [
    "string"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|status|integer(int32)|false|none|none|
|message|string|false|none|none|
|data|[[ExerciseReadDTO](#schemaexercisereaddto)]|false|none|none|
|errors|[string]|false|none|none|

<h2 id="tocS_SetExecutionWriteDTO">SetExecutionWriteDTO</h2>
<!-- backwards compatibility -->
<a id="schemasetexecutionwritedto"></a>
<a id="schema_SetExecutionWriteDTO"></a>
<a id="tocSsetexecutionwritedto"></a>
<a id="tocssetexecutionwritedto"></a>

```json
{
  "completed": true,
  "set_id": 0,
  "actual_repetitions": 0,
  "actual_weight": 0.1,
  "actual_duration_seconds": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|completed|boolean|true|none|none|
|set_id|integer(int64)|true|none|none|
|actual_repetitions|integer(int32)|false|none|none|
|actual_weight|number(double)|false|none|none|
|actual_duration_seconds|integer(int32)|false|none|none|

<h2 id="tocS_WorkoutExecutionWriteDTO">WorkoutExecutionWriteDTO</h2>
<!-- backwards compatibility -->
<a id="schemaworkoutexecutionwritedto"></a>
<a id="schema_WorkoutExecutionWriteDTO"></a>
<a id="tocSworkoutexecutionwritedto"></a>
<a id="tocsworkoutexecutionwritedto"></a>

```json
{
  "executions": [
    {
      "set_executions": [
        {
          "completed": true,
          "set_id": 0,
          "actual_repetitions": 0,
          "actual_weight": 0.1,
          "actual_duration_seconds": 0
        }
      ]
    }
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|executions|[[WorkoutExerciseExecutionWriteDTO](#schemaworkoutexerciseexecutionwritedto)]|false|none|none|

<h2 id="tocS_WorkoutExerciseExecutionWriteDTO">WorkoutExerciseExecutionWriteDTO</h2>
<!-- backwards compatibility -->
<a id="schemaworkoutexerciseexecutionwritedto"></a>
<a id="schema_WorkoutExerciseExecutionWriteDTO"></a>
<a id="tocSworkoutexerciseexecutionwritedto"></a>
<a id="tocsworkoutexerciseexecutionwritedto"></a>

```json
{
  "set_executions": [
    {
      "completed": true,
      "set_id": 0,
      "actual_repetitions": 0,
      "actual_weight": 0.1,
      "actual_duration_seconds": 0
    }
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|set_executions|[[SetExecutionWriteDTO](#schemasetexecutionwritedto)]|false|none|none|

<h2 id="tocS_ResponseDTOWorkoutExecutionReadDTO">ResponseDTOWorkoutExecutionReadDTO</h2>
<!-- backwards compatibility -->
<a id="schemaresponsedtoworkoutexecutionreaddto"></a>
<a id="schema_ResponseDTOWorkoutExecutionReadDTO"></a>
<a id="tocSresponsedtoworkoutexecutionreaddto"></a>
<a id="tocsresponsedtoworkoutexecutionreaddto"></a>

```json
{
  "status": 0,
  "message": "string",
  "data": [
    {
      "id": 0,
      "completed": true,
      "workout_exercises_execution": [
        {
          "id": 0,
          "completed": true,
          "set_executions": [
            {
              "id": 0,
              "set": {
                "id": 0,
                "position": 0,
                "category": "NORMAL",
                "type": "REPS",
                "repetitions": 0,
                "weight": 0.1,
                "duration_seconds": 0
              },
              "completed": true,
              "actual_repetitions": 0,
              "actual_weight": 0.1,
              "actual_duration_seconds": 0
            }
          ],
          "start_time": "2019-08-24T14:15:22Z",
          "end_time": "2019-08-24T14:15:22Z"
        }
      ],
      "start_time": "2019-08-24T14:15:22Z",
      "end_time": "2019-08-24T14:15:22Z"
    }
  ],
  "errors": [
    "string"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|status|integer(int32)|false|none|none|
|message|string|false|none|none|
|data|[[WorkoutExecutionReadDTO](#schemaworkoutexecutionreaddto)]|false|none|none|
|errors|[string]|false|none|none|

<h2 id="tocS_SetExecutionReadDTO">SetExecutionReadDTO</h2>
<!-- backwards compatibility -->
<a id="schemasetexecutionreaddto"></a>
<a id="schema_SetExecutionReadDTO"></a>
<a id="tocSsetexecutionreaddto"></a>
<a id="tocssetexecutionreaddto"></a>

```json
{
  "id": 0,
  "set": {
    "id": 0,
    "position": 0,
    "category": "NORMAL",
    "type": "REPS",
    "repetitions": 0,
    "weight": 0.1,
    "duration_seconds": 0
  },
  "completed": true,
  "actual_repetitions": 0,
  "actual_weight": 0.1,
  "actual_duration_seconds": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer(int64)|false|none|none|
|set|[SetReadDTO](#schemasetreaddto)|false|none|none|
|completed|boolean|false|none|none|
|actual_repetitions|integer(int32)|false|none|none|
|actual_weight|number(double)|false|none|none|
|actual_duration_seconds|integer(int32)|false|none|none|

<h2 id="tocS_WorkoutExecutionReadDTO">WorkoutExecutionReadDTO</h2>
<!-- backwards compatibility -->
<a id="schemaworkoutexecutionreaddto"></a>
<a id="schema_WorkoutExecutionReadDTO"></a>
<a id="tocSworkoutexecutionreaddto"></a>
<a id="tocsworkoutexecutionreaddto"></a>

```json
{
  "id": 0,
  "completed": true,
  "workout_exercises_execution": [
    {
      "id": 0,
      "completed": true,
      "set_executions": [
        {
          "id": 0,
          "set": {
            "id": 0,
            "position": 0,
            "category": "NORMAL",
            "type": "REPS",
            "repetitions": 0,
            "weight": 0.1,
            "duration_seconds": 0
          },
          "completed": true,
          "actual_repetitions": 0,
          "actual_weight": 0.1,
          "actual_duration_seconds": 0
        }
      ],
      "start_time": "2019-08-24T14:15:22Z",
      "end_time": "2019-08-24T14:15:22Z"
    }
  ],
  "start_time": "2019-08-24T14:15:22Z",
  "end_time": "2019-08-24T14:15:22Z"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer(int64)|false|none|none|
|completed|boolean|false|none|none|
|workout_exercises_execution|[[WorkoutExerciseExecutionReadDTO](#schemaworkoutexerciseexecutionreaddto)]|false|none|none|
|start_time|string(date-time)|false|none|none|
|end_time|string(date-time)|false|none|none|

<h2 id="tocS_WorkoutExerciseExecutionReadDTO">WorkoutExerciseExecutionReadDTO</h2>
<!-- backwards compatibility -->
<a id="schemaworkoutexerciseexecutionreaddto"></a>
<a id="schema_WorkoutExerciseExecutionReadDTO"></a>
<a id="tocSworkoutexerciseexecutionreaddto"></a>
<a id="tocsworkoutexerciseexecutionreaddto"></a>

```json
{
  "id": 0,
  "completed": true,
  "set_executions": [
    {
      "id": 0,
      "set": {
        "id": 0,
        "position": 0,
        "category": "NORMAL",
        "type": "REPS",
        "repetitions": 0,
        "weight": 0.1,
        "duration_seconds": 0
      },
      "completed": true,
      "actual_repetitions": 0,
      "actual_weight": 0.1,
      "actual_duration_seconds": 0
    }
  ],
  "start_time": "2019-08-24T14:15:22Z",
  "end_time": "2019-08-24T14:15:22Z"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer(int64)|false|none|none|
|completed|boolean|false|none|none|
|set_executions|[[SetExecutionReadDTO](#schemasetexecutionreaddto)]|false|none|none|
|start_time|string(date-time)|false|none|none|
|end_time|string(date-time)|false|none|none|

