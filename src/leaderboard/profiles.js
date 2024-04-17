import React from 'react'

export default function profiles({ Leaderboard }) {
    //Each profile is mapped and displayed as a flex containing the info from the "Item" function
  return (
        <div id="profile">
            {Item(Leaderboard)}
        </div>
  )
}

function Item(data){
    //If we ever want to add more information to each profile, this is where we add it to the leaderboard
    //We have to fix formatting like for different name lengths, I put a few name lengths to show how it looks a bit weird
    return (
        <>
            {
                data.map((value, index) => (
                    <div key={index}>
                        <div className="flex">
                            <div className="item">
                                <div className="info">
                                    <h3 className='name text-dark'>{value.name}</h3>  
                                    <p>Score: {value.score}</p>  
                                    <span>Level: {value.level}</span> 
                                   {/*I might add another progress bar under the level*/} 
                                </div>                                 
                            </div>
                        </div>
                        <hr />
                    </div>
                ))
            }
        </>
    )
}
