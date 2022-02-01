type User = {
    id: number,
    username:string,
    fullName:string,
    profilePicture:string,
    followed: boolean
}


type Post = {
    id:number,
    description:string,
    owner:User,
    image:string,
    createdAt:number,
    liked:boolean

}

function getPosts(userId:string, postIds:string[]) {
    let postsList:Post[] = []
    for(postId of postIds) {
        const post = getPost(postId)
        postsList.push(post)
    }
    return postsList
}

function getPost(postId:string, userId:string) {
    const post = await db.query(`SELECT * from post WHERE id=${postId}`)
    if(!post) return null
    const foundPost = post[0]
    const poster = await  getPoster(foundPost.user_id, userId) 
    const isLiked = await getIsLiked(postId, userId) db.query(`SELECT * from follow WHERE id`)
    return {

    }
}

async function getPoster(posterId:string, userId:string) {
    const poster = await db.query(`Select * from user WHERE id=${userId}`)
    const isFollowed =  await db.query(`SELECT * from follow WHERE following_id=${posterId} AND follower_id=${userId} `)
    return {
        id:poster.id,
        username:poster.username,
        fullname:poster.fullname,
        profile_picture:poster.profile_picture,
        followed = Boolean(isFollowed)
    }
} 

async function getIsLiked(postId, userId) {
    const isLiked = await db.query(`SELECT * from like WHERE post_id=${postId} AND user_id=${userId}`)
    return isLiked 
}