import { useEffect, useState } from 'react';
import { useAppStore } from '@/store';
import { supabase } from '@/lib/supabase';
import { 
  HeartIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  PlusIcon,
  PhotoIcon,
  XMarkIcon,
  EllipsisHorizontalIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

interface SocialPost {
  id: string;
  user_id: string;
  dish_id: string | null;
  content: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
  dishes?: {
    id: string;
    name: string;
    image_url?: string;
  } | null;
  users?: {
    id: string;
    username: string;
    avatar_url: string | null;
  } | null;
  likes_count: number;
  comments_count: number;
  user_liked: boolean;
}

interface SocialComment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  users?: {
    id: string;
    username: string;
    avatar_url: string | null;
  } | null;
}

export default function Social() {
  const { dishes, loading: dishesLoading, fetchDishes } = useAppStore();
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [comments, setComments] = useState<SocialComment[]>([]);
  const [newPost, setNewPost] = useState({ content: '', dish_id: '', image_url: '' });
  const [newComment, setNewComment] = useState('');
  const [dishSearchQuery, setDishSearchQuery] = useState('');
  const [showDishDropdown, setShowDishDropdown] = useState(false);

  useEffect(() => {
    fetchPosts();
    fetchDishes();
  }, []);

  // 点击外部区域关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.dish-search-container')) {
        setShowDishDropdown(false);
      }
    };

    if (showDishDropdown) {
       document.addEventListener('mousedown', handleClickOutside);
       return () => document.removeEventListener('mousedown', handleClickOutside);
     }
   }, [showDishDropdown]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      
      // 模拟获取社交动态数据
      const mockPosts: SocialPost[] = [
        {
          id: '1',
          user_id: 'user1',
          dish_id: null,
          content: '今天尝试了新的川菜做法，麻辣鲜香，太好吃了！分享给大家～',
          image_url: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=spicy%20sichuan%20cuisine%20dish%20with%20red%20peppers&image_size=landscape_4_3',
          created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          users: {
            id: 'user1',
            username: '美食达人小王',
            avatar_url: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=friendly%20asian%20person%20avatar%20smiling&image_size=square'
          },
          likes_count: 24,
          comments_count: 8,
          user_liked: false
        },
        {
          id: '2',
          user_id: 'user2',
          dish_id: dishes[0]?.id || null,
          content: '按照食谱做了宫保鸡丁，味道很正宗！推荐大家试试',
          image_url: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=kung%20pao%20chicken%20dish%20with%20peanuts%20and%20vegetables&image_size=landscape_4_3',
          created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          updated_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          dishes: dishes[0] ? {
            id: dishes[0].id,
            name: dishes[0].name,
            image_url: dishes[0].image_url
          } : null,
          users: {
            id: 'user2',
            username: '厨房新手',
            avatar_url: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=young%20person%20cooking%20avatar%20happy&image_size=square'
          },
          likes_count: 15,
          comments_count: 5,
          user_liked: true
        },
        {
          id: '3',
          user_id: 'user3',
          dish_id: null,
          content: '今天的减脂餐，低卡又美味！坚持健康饮食第30天 💪',
          image_url: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=healthy%20low%20calorie%20meal%20with%20vegetables%20and%20lean%20protein&image_size=landscape_4_3',
          created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
          updated_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
          users: {
            id: 'user3',
            username: '健身小达人',
            avatar_url: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=fitness%20enthusiast%20avatar%20healthy%20lifestyle&image_size=square'
          },
          likes_count: 32,
          comments_count: 12,
          user_liked: false
        }
      ];
      
      setPosts(mockPosts);
    } catch (error) {
      console.error('获取社交动态失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async (postId: string) => {
    try {
      // 模拟获取评论数据
      const mockComments: SocialComment[] = [
        {
          id: '1',
          post_id: postId,
          user_id: 'user4',
          content: '看起来很好吃！能分享一下做法吗？',
          created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
          users: {
            id: 'user4',
            username: '吃货小李',
            avatar_url: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=food%20lover%20avatar%20excited&image_size=square'
          }
        },
        {
          id: '2',
          post_id: postId,
          user_id: 'user5',
          content: '太棒了！我也要试试',
          created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          users: {
            id: 'user5',
            username: '美食爱好者',
            avatar_url: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=cooking%20enthusiast%20avatar%20cheerful&image_size=square'
          }
        }
      ];
      
      setComments(mockComments);
    } catch (error) {
      console.error('获取评论失败:', error);
    }
  };

  const handleLike = async (postId: string) => {
    try {
      setPosts(prev => prev.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            user_liked: !post.user_liked,
            likes_count: post.user_liked ? post.likes_count - 1 : post.likes_count + 1
          };
        }
        return post;
      }));
    } catch (error) {
      console.error('点赞失败:', error);
    }
  };

  const handleCreatePost = async () => {
    if (!newPost.content.trim()) return;
    
    try {
      const mockPost: SocialPost = {
        id: Date.now().toString(),
        user_id: 'current_user',
        dish_id: newPost.dish_id || null,
        content: newPost.content,
        image_url: newPost.image_url || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        dishes: newPost.dish_id ? dishes.find(d => d.id === newPost.dish_id) : null,
        users: {
          id: 'current_user',
          username: '我',
          avatar_url: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20friendly%20smile&image_size=square'
        },
        likes_count: 0,
        comments_count: 0,
        user_liked: false
      };
      
      setPosts(prev => [mockPost, ...prev]);
      setNewPost({ content: '', dish_id: '', image_url: '' });
      setShowCreatePost(false);
    } catch (error) {
      console.error('发布动态失败:', error);
    }
  };

  const handleAddComment = async (postId: string) => {
    if (!newComment.trim()) return;
    
    try {
      const mockComment: SocialComment = {
        id: Date.now().toString(),
        post_id: postId,
        user_id: 'current_user',
        content: newComment,
        created_at: new Date().toISOString(),
        users: {
          id: 'current_user',
          username: '我',
          avatar_url: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20friendly%20smile&image_size=square'
        }
      };
      
      setComments(prev => [...prev, mockComment]);
      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? { ...post, comments_count: post.comments_count + 1 }
          : post
      ));
      setNewComment('');
    } catch (error) {
      console.error('添加评论失败:', error);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return '刚刚';
    if (diffInMinutes < 60) return `${diffInMinutes}分钟前`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}小时前`;
    return `${Math.floor(diffInMinutes / 1440)}天前`;
  };

  if (loading || dishesLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">社交互动</h1>
          <p className="text-gray-600 mt-1">分享美食，交流心得</p>
        </div>
        <button
          onClick={() => setShowCreatePost(true)}
          className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
        >
          <PlusIcon className="w-4 h-4" />
          <span>发布动态</span>
        </button>
      </div>

      {/* 社交动态列表 */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* 用户信息 */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={post.users?.avatar_url || 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20default&image_size=square'}
                  alt={post.users?.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium text-gray-900">{post.users?.username}</div>
                  <div className="text-sm text-gray-500">{formatTimeAgo(post.created_at)}</div>
                </div>
              </div>
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <EllipsisHorizontalIcon className="w-5 h-5" />
              </button>
            </div>

            {/* 动态内容 */}
            <div className="px-4 pb-3">
              <p className="text-gray-900">{post.content}</p>
            </div>

            {/* 关联菜品 */}
            {post.dishes && (
              <div className="px-4 pb-3">
                <Link
                  to={`/dishes/${post.dishes.id}`}
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <img
                    src={post.dishes.image_url || 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=delicious%20food%20dish&image_size=square'}
                    alt={post.dishes.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{post.dishes.name}</div>
                    <div className="text-sm text-gray-500">点击查看菜品详情</div>
                  </div>
                </Link>
              </div>
            )}

            {/* 动态图片 */}
            {post.image_url && (
              <div className="px-4 pb-3">
                <img
                  src={post.image_url}
                  alt="动态图片"
                  className="w-full rounded-lg object-cover max-h-96"
                />
              </div>
            )}

            {/* 互动按钮 */}
            <div className="px-4 py-3 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center space-x-2 transition-colors ${
                      post.user_liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                    }`}
                  >
                    {post.user_liked ? (
                      <HeartSolidIcon className="w-5 h-5" />
                    ) : (
                      <HeartIcon className="w-5 h-5" />
                    )}
                    <span className="text-sm">{post.likes_count}</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      setSelectedPost(selectedPost === post.id ? null : post.id);
                      if (selectedPost !== post.id) {
                        fetchComments(post.id);
                      }
                    }}
                    className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors"
                  >
                    <ChatBubbleLeftIcon className="w-5 h-5" />
                    <span className="text-sm">{post.comments_count}</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
                    <ShareIcon className="w-5 h-5" />
                    <span className="text-sm">分享</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 评论区 */}
            {selectedPost === post.id && (
              <div className="border-t border-gray-100 bg-gray-50">
                {/* 评论列表 */}
                <div className="p-4 space-y-3 max-h-60 overflow-y-auto">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex items-start space-x-3">
                      <img
                        src={comment.users?.avatar_url || 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20default&image_size=square'}
                        alt={comment.users?.username}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="bg-white rounded-lg p-3">
                          <div className="font-medium text-sm text-gray-900 mb-1">
                            {comment.users?.username}
                          </div>
                          <div className="text-gray-700">{comment.content}</div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1 ml-3">
                          {formatTimeAgo(comment.created_at)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* 添加评论 */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex space-x-3">
                    <img
                      src="https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20friendly%20smile&image_size=square"
                      alt="我"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1 flex space-x-2">
                      <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="写下你的评论..."
                        className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleAddComment(post.id);
                          }
                        }}
                      />
                      <button
                        onClick={() => handleAddComment(post.id)}
                        disabled={!newComment.trim()}
                        className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        发送
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 发布动态弹窗 */}
      {showCreatePost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">发布动态</h3>
              <button
                onClick={() => setShowCreatePost(false)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">动态内容</label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                  rows={4}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="分享你的美食心得..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">关联菜品（可选）</label>
                <div className="relative dish-search-container">
                  <input
                    type="text"
                    value={dishSearchQuery}
                    onChange={(e) => {
                      setDishSearchQuery(e.target.value);
                      setShowDishDropdown(true);
                    }}
                    onFocus={() => setShowDishDropdown(true)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="搜索菜品名称..."
                  />
                  
                  {/* 显示已选择的菜品 */}
                  {newPost.dish_id && (
                    <div className="mt-2 flex items-center justify-between bg-orange-50 border border-orange-200 rounded-md px-3 py-2">
                      <span className="text-sm text-orange-800">
                        已选择: {dishes.find(d => d.id === newPost.dish_id)?.name}
                      </span>
                      <button
                        onClick={() => {
                          setNewPost(prev => ({ ...prev, dish_id: '' }));
                          setDishSearchQuery('');
                        }}
                        className="text-orange-600 hover:text-orange-800"
                      >
                        <XMarkIcon className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  
                  {/* 下拉菜品列表 */}
                  {showDishDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {dishes
                        .filter(dish => 
                          dish.name.toLowerCase().includes(dishSearchQuery.toLowerCase())
                        )
                        .slice(0, 10) // 限制显示数量
                        .map(dish => (
                          <button
                            key={dish.id}
                            onClick={() => {
                              setNewPost(prev => ({ ...prev, dish_id: dish.id }));
                              setDishSearchQuery(dish.name);
                              setShowDishDropdown(false);
                            }}
                            className="w-full text-left px-3 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                          >
                            <div className="flex items-center space-x-3">
                              <img
                                src={dish.image_url}
                                alt={dish.name}
                                className="w-8 h-8 rounded object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=delicious%20food%20dish&image_size=square';
                                }}
                              />
                              <div>
                                <div className="font-medium text-sm">{dish.name}</div>
                                {dish.brands && (
                                  <div className="text-xs text-gray-500">{dish.brands.name}</div>
                                )}
                              </div>
                            </div>
                          </button>
                        ))
                      }
                      {dishes.filter(dish => 
                        dish.name.toLowerCase().includes(dishSearchQuery.toLowerCase())
                      ).length === 0 && (
                        <div className="px-3 py-2 text-gray-500 text-sm">未找到匹配的菜品</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">图片链接（可选）</label>
                <input
                  type="url"
                  value={newPost.image_url}
                  onChange={(e) => setNewPost(prev => ({ ...prev, image_url: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="输入图片链接..."
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleCreatePost}
                disabled={!newPost.content.trim()}
                className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                发布
              </button>
              <button
                onClick={() => {
                  setShowCreatePost(false);
                  setNewPost({ content: '', dish_id: '', image_url: '' });
                  setDishSearchQuery('');
                  setShowDishDropdown(false);
                }}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 空状态 */}
      {posts.length === 0 && (
        <div className="text-center py-12">
          <ChatBubbleLeftIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">暂无动态</h3>
          <p className="text-gray-600 mb-4">成为第一个分享美食心得的人吧！</p>
          <button
            onClick={() => setShowCreatePost(true)}
            className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600"
          >
            发布动态
          </button>
        </div>
      )}
    </div>
  );
}