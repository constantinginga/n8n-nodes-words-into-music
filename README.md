# n8n-nodes-words-into-music

This is an n8n community node for [Words into Music](https://wordsintomusic.com/). It lets you create songs from an idea or your own lyrics, check generation status, browse your private song library and check your song credits in n8n workflows. You can also connect it to an AI Agent as a tool.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation) · [Credentials](#credentials) · [Operations](#operations) · [Usage](#usage) · [AI Agent tool](#use-as-an-ai-agent-tool) · [Compatibility](#compatibility) · [Resources](#resources)

## Installation

Follow the [community nodes installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n documentation.

In short: open **Settings > Community Nodes**, select **Install**, enter `n8n-nodes-words-into-music` and confirm.

## Credentials

You need a Words into Music account and an API key. API access has no separate subscription. Starting a song uses one song credit from your account.

1. [Create a Words into Music account](https://wordsintomusic.com/create/) and verify your email.
2. Open [Settings](https://wordsintomusic.com/app/settings/) and create an API key. Enable song generation on the key if you want to create songs. Read-only keys can still check credits and list songs.
3. In n8n, create a **Words Into Music API** credential and paste the key. Keys start with `wim_`.

n8n tests the credential by checking your song credits. Keys expire after 90 days and can be revoked in Settings at any time.

## Operations

| Resource | Operation | What it does | Uses a credit |
| --- | --- | --- | --- |
| Song | Prepare | Validates a song brief and returns a `preparedRequestId`. Preparations expire after one hour. | No |
| Song | Start | Generates a prepared song and returns a `jobId`. | Yes, one |
| Song | Get | Returns one song from your library, optionally with lyrics. | No |
| Song | Get Many | Lists songs in your library, newest first. | No |
| Job | Get Status | Returns the status of a generation job. A ready job includes the song. | No |
| Account | Get Credits | Returns available and reserved song credits and supported languages. | No |

### Song brief fields (Prepare)

- **Request ID**: a stable ID for the brief, 16 to 100 letters, numbers, dashes or underscores. The default builds one from the workflow ID, execution ID and item index. Repeating the same brief with the same ID returns the same preparation. Map your own ID from upstream data if you need retries across executions to reuse one preparation.
- **Mode**: *From Idea* writes the lyrics for you. *From Lyrics* sings the lyrics you provide.
- **Idea** (up to 2,000 characters) or **Lyrics** (up to 4,000 characters).
- **Musical Direction**: style, instruments, mood and vocal delivery, up to 400 characters.
- **Additional Fields**: song language, title, duration (60 to 180 seconds), instrumental, and the language of API messages.

Supported song languages: English, Spanish, German, French, Portuguese (Brazil), Italian, Dutch, Polish, Swedish, Japanese and Korean.

### Job statuses

`generating`, `saving`, `ready`, `failed` and `needs-attention`. Check a job at least 15 seconds apart. A ready job returns the song's private library link. The owner signs in on the website to listen and download. The API does not expose a public audio URL.

## Usage

### Make a song

The usual flow is **Prepare**, then **Start**, then **Get Status** in a loop until the job is no longer generating:

1. **Words into Music: Prepare** with an idea and a musical direction.
2. **Words into Music: Start** with `Prepared Request ID` set to `{{ $json.preparedRequestId }}`.
3. **Wait** for 30 seconds.
4. **Words into Music: Get Status** with `Job ID` set to the `jobId` from the Start node.
5. **If** the status is still `generating` or `saving`, go back to the Wait node.

Import [`examples/make-a-song.json`](examples/make-a-song.json) for a ready-made version of this workflow, then select your credential on each Words into Music node.

If the Start request times out, run Start again with the same prepared request ID. It returns the same job and does not use a second credit. Only prepare a new brief for a different song.

### Check credits before starting

Use **Account: Get Credits** and an **If** node on `availableSongs` to skip the Start step when no credits are left. When no credits are available, Start returns HTTP 402 and no song is created. You can buy credits on the [Words into Music website](https://wordsintomusic.com/).

### List your library

**Song: Get Many** returns one item per song. Turn on **Return All** to follow every page, or set **Limit**.

## Use as an AI Agent tool

The node can be attached to n8n's **AI Agent** node as a tool:

1. Add an **AI Agent** node and a chat model.
2. Under **Tools**, add **Words into Music Tool** and select your credential.
3. Choose the resource and operation, for example *Song: Prepare*. To let the model fill a field, click the sparkle icon next to it (**Let the model define this parameter**).
4. Add a separate Words into Music Tool for each operation the agent needs, such as *Prepare*, *Start*, *Get Status* and *Get Credits*.

Starting a song uses a credit, so give the agent an instruction like "Prepare the song and show me the brief. Only start it after I confirm." You can also leave the *Start* tool out and run it in a normal workflow step instead.

## Compatibility

Built with `@n8n/node-cli` 0.54 and tested on self-hosted n8n 2.45.4. The node uses n8n's declarative request style and has no runtime dependencies.

## Resources

- [Words into Music API documentation](https://wordsintomusic.com/developers/)
- [OpenAPI specification](https://wordsintomusic.com/openapi.json)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- Support: [contact@wordsintomusic.com](mailto:contact@wordsintomusic.com)

## Version history

See [CHANGELOG.md](CHANGELOG.md).

## License

[MIT](LICENSE.md)
